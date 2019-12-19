import Router from 'koa-router'
import NewsModel from '../dbs/models/news.js'

const router = new Router({
  prefix: '/news'
})

router.get('/getNews', async (ctx) => {
  const { cityID, currentPage, pageSize, method } = ctx.request.query
  const total = await NewsModel.countDocuments({ city_id: cityID })
  const skip = (currentPage - 1) * pageSize
  const limit = total - skip >= pageSize ? pageSize : total - skip
  let result
  if (method === 'pubdate') result = await NewsModel.find({ city_id: cityID }).skip(skip).limit(limit).sort({ pubdate: -1 })
  if (method === 'like') result = await NewsModel.find({ city_id: cityID }).skip(skip).limit(limit).sort({ like_count: -1 })
  if (method === 'scan') result = await NewsModel.find({ city_id: cityID }).skip(skip).limit(limit).sort({ scan_count: -1 })
  if (result) {
    ctx.body = {
      code: 0,
      newsList: result.map((news) => {
        return {
          news_id: news.news_id,
          image: news.image[0],
          title: news.title,
          content: news.content[0],
          pubdate: news.pubdate,
          like_count: news.like_count,
          scan_count: news.scan_count
        }
      }),
      total: total
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '暂无最新资讯！'
    }
  }
})

router.get('/getNewsInfo', async (ctx) => {
  const { newsID } = ctx.request.query
  const result = await NewsModel.findOne({ news_id: newsID })
  if (result) {
    ctx.body = {
      code: 0,
      newsInfo: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未获取到该资讯！请稍后重试！'
    }
  }
})

router.post('/like', async (ctx) => {
  const { newsID } = ctx.request.body
  const result = await NewsModel.updateOne({ news_id: newsID }, {
    $inc: { like_count: 1 }
  })
  if (result) {
    ctx.body = {
      code: 0,
      msg: '点赞成功！'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '点赞失败！请稍后重试'
    }
  }
})

router.get('/addScanCount', async (ctx) => {
  const { newsID } = ctx.request.query
  const result = await NewsModel.updateOne({ news_id: newsID }, {
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
