import Koa from 'koa'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import json from 'koa-json'
import Redis from 'koa-redis'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport.js'
import user from './interface/user.js'
import geo from './interface/geo.js'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// 使用session
app.keys = ['ly', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'ly',
  prefix: 'ly:uid',
  store: new Redis({ host: dbConfig.redis.host, port: dbConfig.redis.port })
}))

// 使用bodyParser，能获得 ctx的 request.body
app.use(bodyParser({
  extendTypes: ['json', 'text', 'form']
}))

// 使用 json解析
app.use(json())

// 连接mongodb
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
mongoose.set('useFindAndModify', false)
const db = mongoose.connection
db.once('connected', function () {
  console.log(`success connect to ${dbConfig.dbs} connected`)
})
db.once('error', function () {
  console.log(`unsuccess connect to ${dbConfig.dbs} error`)
})
db.on('open', function () {
  console.log(`success connect to ${dbConfig.dbs} open`)
})
db.once('disconnected', function () {
  console.log(`disconnected to ${dbConfig.dbs} disconnected`)
})

// 初始化passport
app.use(passport.initialize())
// 持久登录会话(必须在使用session()之前)
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 启用路由
  app.use(user.routes()).use(user.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
