import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UsersModel from '../../dbs/models/users.js'

passport.use(new LocalStrategy(async (username, password, done) => {
  const result = await UsersModel.findOne({
    username
  })
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误，请重新输入！')
    }
  } else {
    return done(null, false, '用户名不存在！')
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport
