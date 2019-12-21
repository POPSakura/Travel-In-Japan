import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import mongoose from 'mongoose'
import UserModel from '../dbs/models/users.js'
import Email from '../dbs/config.js'
import passport from './utils/passport.js'
import axios from './utils/axios.js'
import upload from './utils/upload.js'

const router = new Router({
  prefix: '/user'
})

const Store = new Redis().client

// 发送验证码接口
router.post('/verify', async (ctx) => {
  const username = ctx.request.body.username
  // 获取 redis 中相关用户的验证码有效时间
  const saveExpire = await Store.hget(`travelmail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内请求一次！'
    }
    return false
  }
  // 创建 transporter（运输车）
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host, // 所使用服务的主机
    port: Email.smtp.port, // 所使用服务的端口
    secure: false, // true for 465, false for other ports 是否使用SSL
    auth: {
      user: Email.smtp.user, // 发送端邮箱
      pass: Email.smtp.pass // 发送端秘钥
    }
  })
  const content = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 设置发送邮件的 option （发送的内容、路线）
  const mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`, // 发送端邮箱
    to: content.email, // 接收端邮箱
    subject: '漫游日本注册码', // 主题
    text: '欢迎成为日本印象的一员',
    html: `欢迎成为日本印象的一员，您的验证码为${content.code}` // 内容
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      ctx.body = {
        code: -2,
        msg: '验证码发送失败！'
      }
      return false
    } else {
      Store.hmset(`travelmail:${content.user}`, 'code', content.code, 'expire', content.expire, 'email', content.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码发送成功，有效期一分钟'
  }
})

// 注册接口
router.post('/signup', async (ctx) => {
  const { username, password, code, email } = ctx.request.body
  if (code) {
    const saveExpire = await Store.hget(`travelmail:${username}`, 'expire')
    const saveCode = await Store.hget(`travelmail:${username}`, 'code')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -2,
          msg: '验证码已过期，请重新获取！'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -3,
        msg: '验证码错误，请重新输入！'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码！'
    }
    return false
  }
  const user = await UserModel.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -4,
      msg: '用户名已存在，请重新输入！'
    }
    return false
  }
  const newUser = await UserModel.create({
    user_id: new mongoose.Types.ObjectId().toHexString(),
    username,
    password,
    email
  })
  if (newUser) {
    const res = await axios.post('/user/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功！将跳转登录页'
      }
    } else {
      ctx.body = {
        code: -5,
        msg: '服务器错误！'
      }
    }
  } else {
    ctx.body = {
      code: -6,
      msg: '注册失败！'
    }
  }
})

// 登陆接口
router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登陆成功'
      }
      ctx.login(user)
    } else {
      ctx.body = {
        code: -2,
        msg: info
      }
    }
  })(ctx, next)
})

// 用户退出接口
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户个人资料接口
router.get('/getUserData', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, sex, age, email, tel, city, person_sign, date, head } = await ctx.session.passport.user
    ctx.body = {
      code: 0,
      user: {
        username,
        sex,
        age,
        email,
        telephone: tel,
        city: city,
        sign: person_sign,
        date,
        head
      }
    }
  } else {
    ctx.body = {
      code: -1,
      user: {
        username: '',
        sex: '',
        age: '',
        email: '',
        telephone: '',
        city: '',
        sign: '',
        date: '',
        head: ''
      }
    }
  }
})

// 修改用户个人资料接口
router.post('/modifyUserData', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username: pusername } = ctx.session.passport.user
    const { username, sex, age, email, telephone, city, sign } = ctx.request.body
    const findUser = await UserModel.find({ username })
    if (!findUser.length || username === pusername) {
      const result = await UserModel.findOneAndUpdate({ username: pusername }, {
        username,
        sex,
        age,
        email,
        tel: telephone,
        city,
        person_sign: sign
      }, { new: true })
      ctx.session.passport.user = result
      ctx.body = {
        code: 0,
        msg: '修改成功！',
        user: {
          username: result.username,
          sex: result.sex,
          age: result.age,
          email: result.email,
          telephone: result.tel,
          city: result.city,
          sign: result.person_sign,
          date: result.date,
          head: result.head
        }
      }
    } else {
      ctx.body = {
        code: -2,
        msg: '用户名已存在！'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '您尚未登录，请先登录！'
    }
  }
})

// 校验用户密码接口
router.post('/checkPass', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { password: pass } = ctx.request.body
    const { username } = ctx.session.passport.user
    const result = await UserModel.find({
      username
    })
    if (result.length) {
      if (result[0].password === pass) {
        ctx.body = {
          code: 0,
          msg: '验证通过，可修改密码！'
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '密码错误！'
        }
      }
    } else {
      ctx.body = {
        code: -2,
        msg: '用户不存在！请注册！'
      }
    }
  } else {
    ctx.body = {
      code: -3,
      msg: '尚未登录，请先登录！'
    }
  }
})

// 修改密码接口
router.post('/modifyUserPass', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { oldPass, newPass } = ctx.request.body
    const { username } = ctx.session.passport.user
    const result = await UserModel.find({
      username
    })
    if (result.length) {
      if (result[0].password === oldPass) {
        const res = await UserModel.updateOne({ username }, { password: newPass })
        if (res) {
          ctx.body = {
            code: 0,
            msg: '密码修改成功！请重新登录！'
          }
        } else {
          ctx.body = {
            code: -4,
            msg: '数据库错误！请稍后重试！'
          }
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '旧密码错误！请重新输入！'
        }
      }
    } else {
      ctx.body = {
        code: -2,
        msg: '用户不存在！请注册！'
      }
    }
  } else {
    ctx.body = {
      code: -3,
      msg: '尚未登录，请先登录！'
    }
  }
})

// 修改头像接口
router.post('/modifyUserHead', upload.single('file'), async (ctx) => {
  if (ctx.isAuthenticated()) {
    const path = ctx.req.file.destination.split('//').slice(-1)
    const { username } = ctx.session.passport.user
    const rePath = `/${path}/` + ctx.req.file.filename
    const { head } = await UserModel.findOneAndUpdate({ username }, { head: rePath }, { new: true })
    if (head) {
      ctx.session.passport.user.head = head
      ctx.body = {
        code: 0,
        msg: '上传成功！',
        head
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '上传失败！找不到用户！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

export default router
