import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'
import PlaceModel from '../dbs/models/places.js'
import AreaModel from '../dbs/models/areas.js'
import HotelModel from '../dbs/models/hotels.js'
import NewsModel from '../dbs/models/news.js'

const router = new Router({
  prefix: '/add'
})

router.get('/', async (ctx) => {
  const data = [
    {
      news_id: Math.round((Math.random().toFixed(14)) * Math.pow(10, 14)).toString(),
      county_id: 29,
      city_id: 2901,
      title: '住在奈良 | 睡在樱花堆里看小鹿乱撞！',
      content: [
        '没人能抗拒奈良的春日颜值。',
        '作为妹子们拍照打卡、少女心爆炸的圣地，奈良的春天让你不虚此行。',
        '因为再没有一个地方的春天，只与樱花和鹿有关。奈良公园，承包你所有的春日想象。',
        '在奈良公园，总能在不经意的角落看到小鹿惬意的身影。',
        '它们在樱花树间穿行，一边目光清澈的望向你，一边伸出小舌头舔舐满地落花。',
        '有没有想过住在樱花季的奈良里？粉红樱花落满窗前，灵动十足的小鹿在你门口嬉戏。',
        '奈良的小鹿世世代代在这里生活，这些天然野生的小鹿们，自由自在地奔跑在樱花树下。'
      ],
      image: [
        '/news_img/news290113.jpeg',
        '/news_img/news290114.gif',
        '/news_img/news290115.jpeg'
      ]
    }
  ]
  await NewsModel.insertMany(data)
})

export default router
