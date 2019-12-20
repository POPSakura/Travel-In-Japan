import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'
import PlaceModel from '../dbs/models/places.js'
import AreaModel from '../dbs/models/areas.js'
import HotelModel from '../dbs/models/hotels.js'
import NewsModel from '../dbs/models/news.js'
import LineModel from '../dbs/models/lines.js'

const router = new Router({
  prefix: '/add'
})

router.get('/', async (ctx) => {
  const data = [
    {
      line_id: 290100001,
      county_id: 29,
      city_id: 2901,
      line: '奈良市内经典一日游',
      period: '1天',
      season: '4月-10月',
      point: [
        { 
          name: '兴福寺', 
          image: '/line_img/290100001/line1.jpeg',
          latitude: 34.682884496646,
          longitude: 135.83222664608
        },
        { 
          name: '平宗柿叶寿司', 
          image: '/line_img/290100001/line2.jpeg',
          latitude: 34.680106,
          longitude: 135.830463
        },
        { 
          name: '奈良公园', 
          image: '/line_img/290100001/line3.jpeg',
          latitude: 34.685048009687,
          longitude: 135.84301266472 
        },
        { 
          name: '春日荷茶屋', 
          image: '/line_img/290100001/line4.jpeg',
          latitude: 34.682277,
          longitude: 135.843433
        },
        { 
          name: '奈良町',
          image: '/line_img/290100001/line5.jpeg', 
          latitude: 34.650333551621,
          longitude: 135.78602095337
        }
      ],
      tips: '奈良游玩一日的行程安排居多，当日可往返与京都或大阪的酒店住宿。',
      summary: '路线按景点热度及位置来安排，一天内可游览奈良最热门最具风情的地方。'
    },
    {
      line_id: 290100002,
      county_id: 29,
      city_id: 2901,
      line: '关西京都大阪奈良7日线路',
      period: '7-9天',
      season: '3-10月',
      point: [
        { 
          name: '京都', 
          image: '/line_img/290100002/line1.jpeg',
          latitude: 35.0116363,
          longitude: 135.7680294
        },
        { 
          name: '大阪', 
          image: '/line_img/290100002/line2.jpeg',
          latitude: 34.6937378,
          longitude: 135.5021651
        },
        { 
          name: '奈良', 
          image: '/line_img/290100002/line3.jpeg',
          latitude: 34.6850869,
          longitude: 135.8050002 
        }
      ],
      tips: '推荐抵达关西机场后，直接乘JR直达京都站，只需80分钟。这样行程中只用定两家酒店，减轻了换酒店的繁琐。最后大阪购物，减轻行李负担。',
      summary: '畅游关西三大热门城市，集中区域安排景点，游玩省时省力。'
    },
    {
      line_id: 290100003,
      county_id: 29,
      city_id: 2901,
      line: '关东关西8日线路',
      period: '8-10天左右',
      season: '3月-10月',
      point: [
        { 
          name: '东京', 
          image: '/line_img/290100003/line1.jpeg',
          latitude: 35.751743979081,
          longitude: 139.699152625
        },
        { 
          name: '京都', 
          image: '/line_img/290100003/line2.jpeg',
          latitude: 35.01425155046,
          longitude: 135.76629638672
        },
        { 
          name: '奈良', 
          image: '/line_img/290100003/line3.jpeg',
          latitude: 34.669255823732,
          longitude: 135.81100585938 
        },
        { 
          name: '大阪', 
          image: '/line_img/290100003/line4.jpeg',
          latitude: 34.701909,
          longitude: 135.494977
        }
      ],
      tips: '原则上东京进与大阪出更省时间，若能买到便宜机票也可考虑同一地点进出，此时一张JR pass会省下不少交通费。',
      summary: '集中游览关东关西重要城市，每日游览轻松，美景购物两不误。城市停留时间短，个性化需求需要重新规划。'
    },
    {
      line_id: 290100004,
      county_id: 29,
      city_id: 2901,
      line: '关东关西深度10日线路',
      period: '10天',
      season: '3月-10月',
      point: [
        { 
          name: '东京', 
          image: '/line_img/290100004/line1.jpeg',
          latitude: 35.702414015871,
          longitude: 139.72791907344
        },
        { 
          name: '箱根', 
          image: '/line_img/290100004/line2.jpeg',
          latitude: 35.2323553,
          longitude: 139.1069375
        },
        { 
          name: '京都', 
          image: '/line_img/290100004/line3.jpeg',
          latitude: 35.0116363,
          longitude: 135.7680294 
        },
        { 
          name: '宇治', 
          image: '/line_img/290100004/line4.jpeg',
          latitude: 34.8844606,
          longitude: 135.7998544
        },
        { 
          name: '奈良',
          image: '/line_img/290100004/line5.jpeg',
          latitude: 34.6850869,
          longitude: 135.8050002
        },
        { 
          name: '神户',
          image: '/line_img/290100004/line6.jpeg',
          latitude: 34.690083,
          longitude: 135.1955112
        },
        { 
          name: '大阪',
          image: '/line_img/290100004/line7.jpeg',
          latitude: 34.6937378,
          longitude: 135.5021651
        }
      ]
    },
    {
      line_id: 290100005,
      county_id: 29,
      city_id: 2901,
      line: '日本经典温泉美景8日线路',
      period: '8天',
      season: '全年',
      point: [
        { 
          name: '东京', 
          image: '/line_img/290100005/line1.jpeg',
          latitude: 35.702414015871,
          longitude: 139.72791907344
        },
        { 
          name: '富士山', 
          image: '/line_img/290100005/line2.jpeg',
          latitude: 35.357217535157,
          longitude: 138.73713684082
        },
        { 
          name: '箱根', 
          image: '/line_img/290100005/line3.jpeg',
          latitude: 35.2323553,
          longitude: 139.1069375 
        },
        { 
          name: '京都', 
          image: '/line_img/290100005/line4.jpeg',
          latitude: 35.0116363,
          longitude: 135.7680294
        },
        { 
          name: '大阪',
          image: '/line_img/290100005/line5.jpeg', 
          latitude: 34.6937378,
          longitude: 135.5021651
        },
        { 
          name: '奈良',
          image: '/line_img/290100005/line6.jpeg', 
          latitude: 34.6850869,
          longitude: 135.8050002
        }
      ],
      summary: '日本是地震多发国，出行前了解地震应对常识。丢弃垃圾的时候，一定记得要按照垃圾箱上的指示分类。在日本吸烟得去吸烟区(喫煙所 Kitsuenjyo)。'
    }
  ]
  await LineModel.insertMany(data)
})

export default router
