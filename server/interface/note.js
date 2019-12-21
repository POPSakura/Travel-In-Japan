import Router from 'koa-router'
import NoteModel from '../dbs/models/notes.js'
import LikeModel from '../dbs/models/likes.js'
import upload from './utils/uploadNoteImage.js'

const router = new Router({
  prefix: '/note'
})

// 上传游记图片接口
router.post('/uploadNoteImage', upload.single('file'), async (ctx) => {
  if (ctx.isAuthenticated()) {
    const path = ctx.req.file.destination.split('//').slice(-1)
    const rePath = `/${path}/` + ctx.req.file.filename
    if (rePath) {
      ctx.body = {
        code: 0,
        msg: '上传成功！',
        rePath
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '上传失败！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 添加游记
router.post('/addNoteOfCity', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { form } = ctx.request.body
    const { countyID: county_id, cityID: city_id } = ctx.request.body
    const note_id = Math.round((Math.random().toFixed(18)) * Math.pow(10, 18)).toString()
    const { user_id } = ctx.session.passport.user
    const note = {}
    Object.keys(form).forEach((item) => {
      if (form[item]) note[item] = form[item]
    })
    const result = await NoteModel.create(Object.assign({}, { note_id, county_id, city_id, user_id }, note))
    if (result) {
      ctx.body = {
        code: 0,
        msg: '发表成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '发表失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 获取游记
router.get('/getNoteOfCity', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { type } = ctx.request.query
    const form = JSON.parse(ctx.request.query.form)
    const option = {}
    Object.keys(form).forEach((item) => {
      const str = form[item]
      if (str !== '') {
        if (str.indexOf('-') > -1) option[item] = { $gte: str.split('-').map(n => parseInt(n))[0], $lte: str.split('-').map(n => parseInt(n))[1] }
        if (str.indexOf('>') > -1) option[item] = { $gt: parseInt(str.slice(1)) }
        if (str.indexOf('<') > -1) option[item] = { $lt: parseInt(str.slice(1)) }
      }
    })
    const { user_id: userID } = ctx.session.passport.user
    const cityID = parseInt(ctx.request.query.cityID)
    const currentPage = parseInt(ctx.request.query.currentPage)
    const pageSize = parseInt(ctx.request.query.pageSize)
    const total = await NoteModel.countDocuments(Object.assign(option, { city_id: cityID }))
    if (!total) {
      ctx.body = {
        code: 0,
        noteList: [],
        total: 0
      }
      return false
    }
    const skip = (currentPage - 1) * pageSize
    const limit = total - skip >= pageSize ? pageSize : total - skip
    let result
    if (type === 'hot') {
      result = await NoteModel.aggregate([
        {
          $match: Object.assign(option, { city_id: cityID })
        },
        {
          $lookup: {
            from: 'likes',
            localField: 'note_id',
            foreignField: 'series_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'user'
          }
        },
        {
          $sort: { scan_count: -1 }
        },
        { $skip: skip },
        { $limit: limit }
      ])
    } else {
      result = await NoteModel.aggregate([
        {
          $match: Object.assign(option, { city_id: cityID })
        },
        {
          $lookup: {
            from: 'likes',
            localField: 'note_id',
            foreignField: 'series_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'user'
          }
        },
        {
          $sort: { pubdate: -1 }
        },
        { $skip: skip },
        { $limit: limit }
      ])
    }
    const noteList = result.map((note) => {
      const userInfo = note.user.map((user) => {
        return {
          username: user.username,
          head: user.head
        }
      })
      const user = note.likes.find(like => like.user_id === userID)
      const status = user ? user.status : 0
      return {
        note_id: note.note_id,
        image: note.image,
        note: note.note,
        like_status: status,
        like_count: note.like_count,
        user: userInfo,
        pubdate: note.pubdate,
        describe: note.describe,
        scan_count: note.scan_count
      }
    })
    ctx.body = {
      code: 0,
      noteList: noteList,
      total
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 点赞接口
router.post('/like', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { user_id: userID } = ctx.session.passport.user
    const { noteID } = ctx.request.body
    const result = await LikeModel.findOne({
      series_id: noteID,
      user_id: userID
    })
    if (result) {
      const setLikeFlag = await LikeModel.updateOne({
        series_id: noteID,
        user_id: userID
      }, { $set: { status: result.status === 0 ? 1 : 0 } })
      const setLikeCountFlag = await NoteModel.updateOne({
        note_id: noteID
      }, { $inc: { like_count: result.status === 0 ? 1 : -1 } })
      ctx.body = setLikeFlag && setLikeCountFlag ? {
        code: 0,
        msg: result.status === 0 ? '点赞成功！' : '取消赞成功！'
      } : {
        code: -1,
        msg: '点赞失败！请稍后重试！'
      }
    } else {
      const like = {
        like_id: Math.round((Math.random().toFixed(15)) * Math.pow(10, 15)).toString(),
        series_id: noteID,
        user_id: userID,
        status: 1
      }
      const setLikeFlag = await LikeModel.create(like)
      const setLikeCountFlag = await NoteModel.updateOne({
        note_id: noteID
      }, { $inc: { like_count: 1 } })
      ctx.body = setLikeFlag && setLikeCountFlag ? {
        code: 0,
        msg: '点赞成功！'
      } : {
        code: -1,
        msg: '点赞失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 获取游记详细
router.get('/getNoteInfo', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { noteID } = ctx.request.query
    const { user_id: userID } = ctx.session.passport.user
    const result = await NoteModel.aggregate([
      {
        $match: { note_id: noteID }
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'note_id',
          foreignField: 'series_id',
          as: 'likes'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'user'
        }
      }
    ])
    if (result) {
      const user = result[0].likes.find(like => like.user_id === userID)
      const status = user ? user.status : 0
      ctx.body = {
        code: 0,
        noteInfo: {
          note: result[0].note,
          content: result[0].content,
          image: result[0].image,
          like_status: status,
          like_count: result[0].like_count,
          user: {
            username: result[0].user[0].username,
            head: result[0].user[0].head
          },
          pubdate: result[0].pubdate,
          scan_count: result[0].scan_count,
          date: result[0].date,
          day: result[0].day,
          person: result[0].person,
          price_average: result[0].price_average
        }
      }
    } else {
      ctx.body = {
        code: -1,
        mag: '暂无数据！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.get('/addScanCount', async (ctx) => {
  const { noteID } = ctx.request.query
  const result = await NoteModel.updateOne({ note_id: noteID }, {
    $inc: { scan_count: 1 }
  })
  if (result) {
    ctx.body = {
      code: 0,
      msg: '增加成功！'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未获取到该资讯！请稍后重试！'
    }
  }
})

export default router
