import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'
import PlaceModel from '../dbs/models/places.js'
import AreaModel from '../dbs/models/areas.js'
import HotelModel from '../dbs/models/hotels.js'
import LineModel from '../dbs/models/lines.js'

const router = new Router({
  prefix: '/geo'
})

// 获取日本县级接口
router.get('/getCounties', async (ctx) => {
  const result = await CountyModel.find()
  if (result.length) {
    ctx.body = {
      code: 0,
      counties: result.map((county) => {
        return {
          county_id: county.id,
          local: county.local,
          county_name: county.county
        }
      })
    }
  } else {
    ctx.body = {
      code: -1,
      counties: []
    }
  }
})

// 获取日本县级相关区级接口
router.get('/getCities/:id', async (ctx) => {
  const result = await CityModel.find({
    county_id: ctx.params.id
  })
  if (result.length) {
    ctx.body = {
      code: 0,
      cities: result.map((city) => {
        return {
          city_id: city.city_id,
          city_name: city.city
        }
      })
    }
  } else {
    ctx.body = {
      code: -1,
      cities: []
    }
  }
})

// 获取所有区级接口
router.get('/getAllCities', async (ctx) => {
  const result = await CityModel.find()
  if (result.length) {
    const allCities = result.map((city) => {
      return {
        city_id: city.city_id,
        city_name: city.city
      }
    })
    ctx.body = {
      code: 0,
      all_cities: allCities
    }
  } else {
    ctx.body = {
      code: -1,
      all_cities: []
    }
  }
})

// 获取某地区的信息详情
router.get('/getCityInfo', async (ctx) => {
  const { cityID } = ctx.request.query
  const { city, introduction } = await CityModel.findOne({ city_id: cityID }, { city: 1, introduction: 1 })
  const data = await PlaceModel.find({ city_id: cityID, top: { $ne: 0 } }, {
    place: 1,
    place_id: 1,
    comment_count: 1,
    introduction: 1,
    inside_place: 1,
    image: 1
  })
  function findInsidePlace(top) {
    return new Promise(async (resolve, reject) => {
      let inside
      if (!top.inside_place.length) inside = []
      else inside = await PlaceModel.find({ place_id: { $in: top.inside_place } }, { place: 1, place_id: 1 })
      // console.log(inside)
      resolve({
        place: top.place,
        place_id: top.place_id,
        comment_count: top.comment_count,
        place_introduction: top.introduction,
        place_inside_places: inside,
        images: top.image
      })
    })
  }
  const topPlace = []
  for (let i = 0; i < data.length; i++) {
    const place = await findInsidePlace(data[i])
    topPlace.push(place)
  }
  const hotPlace = await PlaceModel.find({ city_id: cityID, hot: true }, {
    place: 1,
    place_id: 1,
    introduction: 1,
    image: 1
  })
  ctx.body = {
    code: 0,
    areaInfo: {
      city: city,
      city_introduction: introduction,
      top_places: topPlace,
      hot_places: hotPlace.map((hot) => {
        return {
          place: hot.place,
          place_id: hot.place_id,
          place_introduction: hot.introduction,
          image: hot.image[0]
        }
      })
    }
  }
})

// 获取某地区景点
router.get('/getPlaceOfCity', async (ctx) => {
  const cityID = parseInt(ctx.request.query.cityID)
  const pageSize = parseInt(ctx.request.query.pageSize)
  const currentPage = parseInt(ctx.request.query.currentPage)
  const total = await PlaceModel.countDocuments({ city_id: cityID })
  if (!total) {
    ctx.body = {
      code: -1,
      msg: '未找到相关景点'
    }
    return
  }
  const skip = (currentPage - 1) * pageSize
  const limit = total - skip >= pageSize ? pageSize : total - skip
  const result = await PlaceModel.find({ city_id: cityID }, {
    place: 1,
    place_id: 1,
    image: 1,
    comment_count: 1
  }).skip((currentPage - 1) * pageSize).limit(limit)
  ctx.body = {
    code: 0,
    placeList: result.map((item) => {
      return {
        place: item.place,
        place_id: item.place_id,
        image: item.image[0],
        comment_count: item.comment_count
      }
    }),
    total: total
  }
})

// 获取某景点的信息详情
router.get('/getPlaceInfo', async (ctx) => {
  const { placeID } = ctx.request.query
  const result = await PlaceModel.findOne({ place_id: placeID })
  const [insidePlace, nearbyPlace] = [[], []]
  function getInsidePlace(placeId) {
    return new Promise(async (resolve) => {
      const inside = await PlaceModel.findOne({ place_id: placeId }, {
        place: 1,
        place_id: 1,
        image: 1
      })
      inside.image.splice(1)
      resolve(inside)
    })
  }
  function getNearbyPlace(placeId) {
    return new Promise(async (resolve) => {
      const nearby = await PlaceModel.findOne({ place_id: placeId }, {
        place: 1,
        place_id: 1,
        latitude: 1,
        longitude: 1
      })
      resolve(nearby)
    })
  }
  if (result.inside_place.length) {
    for (let i = 0; i < result.inside_place.length; i++) {
      const inside = await getInsidePlace(result.inside_place[i])
      insidePlace.push(inside)
    }
  }
  if (result.nearby_place.length) {
    for (let i = 0; i < result.nearby_place.length; i++) {
      const nearby = await getNearbyPlace(result.nearby_place[i])
      nearbyPlace.push(nearby)
    }
  }
  ctx.body = {
    code: 0,
    placeInfo: {
      place: result.place,
      english_place: result.english_place,
      comment_count: result.comment_count,
      main_img: result.image[0],
      sub_img: result.image.slice(1, 3),
      concerns: result.concerns,
      telephone: result.telephone,
      website: result.website,
      visit_time: result.visit_time,
      traffic: result.traffic,
      ticket: result.ticket,
      open_time: result.open_time,
      location: result.location,
      latitude: result.latitude,
      longitude: result.longitude,
      nearby_place: nearbyPlace,
      inside_place: insidePlace
    }
  }
})

// 获取景点所属地区范围信息详情
router.get('/getAreaInfoOfPlace', async (ctx) => {
  const { placeID } = ctx.request.query
  const { area_id: areaID } = await PlaceModel.findOne({ place_id: placeID }, { area_id: 1 })
  if (areaID === 0) {
    ctx.body = {
      code: -1,
      areaInfo: {}
    }
    return
  }
  const hotelResult = await HotelModel.find({ area_id: areaID, top: 1 }).limit(2)
  const result = await AreaModel.findOne({ area_id: areaID }, {
    area: 1,
    area_id: 1,
    introduction: 1,
    latitude: 1,
    longitude: 1,
    paths: 1
  })
  ctx.body = {
    code: 0,
    areaInfo: {
      area: result.area,
      area_id: result.area_id,
      introduction: result.introduction,
      center: {
        latitude: result.latitude,
        longitude: result.longitude
      },
      coordinates: [
        {
          name: result.area,
          longitude: result.longitude,
          latitude: result.latitude,
          coords: result.paths.map((path) => {
            return {
              latitude: path.latitude,
              longitude: path.longitude
            }
          })
        }
      ],
      nearby_hotel: hotelResult.map((item) => {
        return {
          hotel_id: item.hotel_id,
          hotel: item.english_hotel,
          image: item.image[0]
        }
      })
    }
  }
})

// 获取地区范围信息详情
router.get('/getAreaInfo', async (ctx) => {
  const { cityID } = ctx.request.query
  const result = await AreaModel.find({ city_id: cityID }, {
    area: 1,
    area_id: 1,
    introduction: 1,
    latitude: 1,
    longitude: 1,
    paths: 1
  })
  if (result) {
    ctx.body = {
      code: 0,
      areaList: result.map((area) => {
        return {
          name: area.area,
          id: area.area_id,
          introduction: area.introduction,
          latitude: area.latitude,
          longitude: area.longitude,
          paths: area.paths
        }
      })
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未查询到相关数据'
    }
  }
})

// 获取地区范围内的酒店
router.get('/getHotelOfArea', async (ctx) => {
  const { search } = ctx.request.query
  const currentPage = parseInt(ctx.request.query.currentPage)
  const pageSize = parseInt(ctx.request.query.pageSize)
  const cityID = parseInt(ctx.request.query.cityID)
  const areaID = parseInt(ctx.request.query.areaID)
  const sort = parseInt(ctx.request.query.salesSort)
  const condition = JSON.parse(ctx.request.query.condition)
  const area = await AreaModel.findOne({ area_id: areaID })
  const query = {}
  Object.keys(condition).forEach((item) => {
    if (condition[item] !== '') query[item] = condition[item]
  })
  Object.assign(query, !area || area.area === '全部' ? { city_id: cityID } : { area_id: areaID })
  let result = await HotelModel.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: 'areas',
        localField: 'area_id',
        foreignField: 'area_id',
        as: 'area'
      }
    },
    {
      $sort: {
        product_count: sort ? sort : 1
      }
    }
  ])
  if (search !== '') {
    result = result.filter(hotel => hotel.hotel.indexOf(search) > -1)
  }
  const total = result.length
  const skip = (currentPage - 1) * pageSize
  const limit = total - skip >= pageSize ? pageSize : total - skip
  const hotelResult = result.slice(skip).slice(0, limit)
  ctx.body = {
    code: 0,
    hotelList: hotelResult.map((hotel) => {
      return {
        hotel_id: hotel.hotel_id,
        hotel: hotel.hotel,
        image: hotel.image[0],
        hot: hotel.hot,
        top: hotel.top,
        english_hotel: hotel.english_hotel,
        grade: parseFloat(hotel.grade.toFixed(1)),
        comment_count: hotel.comment_count,
        introduction: hotel.introduction,
        area: hotel.area.length ? hotel.area[0].area : '',
        latitude: hotel.latitude,
        longitude: hotel.longitude
      }
    }),
    total: total
  }
})

// 获取地区范围内的酒店条件列表
router.get('/getConditionInfoOfHotel', async (ctx) => {
  const cityID = parseInt(ctx.request.query.cityID)
  const areaID = parseInt(ctx.request.query.areaID)
  const area = await AreaModel.findOne({ area_id: areaID })
  const query = !area || area.area === '全部' ? { city_id: cityID } : { area_id: areaID }
  const result = await HotelModel.find(query)
  const [kindList, facilityList, brandList] = [[], [], []]
  result.filter(hotel => hotel.kind !== '').map(hotel => hotel.kind).forEach((kind) => {
    if (kindList.includes(kind)) return
    kindList.push(kind)
  })
  result.filter(hotel => hotel.brand !== '').map(hotel => hotel.brand).forEach((brand) => {
    if (brandList.includes(brand)) return
    brandList.push(brand)
  })
  const clone = []
  result.filter(hotel => hotel.facility.length).map(hotel => hotel.facility).forEach((facility) => {
    clone.push(...facility)
  })
  clone.forEach((item) => {
    if (facilityList.includes(item)) return
    facilityList.push(item)
  })
  ctx.body = {
    code: 0,
    list: {
      kindList,
      facilityList,
      brandList
    }
  }
})

// 获取某酒店的信息详情
router.get('/getHotelInfo', async (ctx) => {
  const { hotelID } = ctx.request.query
  const result = await HotelModel.findOne({ hotel_id: hotelID })
  const [nearbyHotel, nearbyPlace] = [[], []]
  function getNearbyHotel(hotelID) {
    return new Promise(async (resolve) => {
      const nearby = await HotelModel.findOne({ hotel_id: hotelID }, {
        hotel: 1,
        hotel_id: 1,
        english_hotel: 1,
        grade: 1,
        image: 1
      })
      nearby.image.splice(1)
      resolve(nearby)
    })
  }
  function getNearbyPlace(placeId) {
    return new Promise(async (resolve) => {
      const nearby = await PlaceModel.findOne({ place_id: placeId }, {
        place: 1,
        place_id: 1,
        latitude: 1,
        longitude: 1
      })
      resolve(nearby)
    })
  }
  if (result.nearby_hotel.length) {
    for (let i = 0; i < result.nearby_hotel.length; i++) {
      const nearby = await getNearbyHotel(result.nearby_hotel[i])
      nearbyHotel.push(nearby)
    }
  }
  if (result.nearby_place.length) {
    for (let i = 0; i < result.nearby_place.length; i++) {
      const nearby = await getNearbyPlace(result.nearby_place[i])
      nearbyPlace.push(nearby)
    }
  }
  ctx.body = {
    code: 0,
    hotelInfo: {
      hotel: result.hotel,
      top: result.top,
      hot: result.hot,
      english_hotel: result.english_hotel,
      address: result.address,
      latitude: result.latitude,
      longitude: result.longitude,
      grade: result.grade.toFixed(1),
      comment_count: result.comment_count,
      introduction: result.introduction,
      main_image: result.image[0],
      sub_image: result.image.slice(1, 7),
      room: result.room,
      nearby_place: nearbyPlace,
      enter_time: result.enter_time,
      leave_time: result.leave_time,
      room_count: result.room_count,
      facilities: result.facility,
      concerns: result.concerns,
      brand: result.brand,
      nearby_hotel: nearbyHotel
    }
  }
})

router.get('/getHotelInfoOfBook', async (ctx) => {
  const { id: hotelID } = ctx.request.query
  const result = await HotelModel.findOne({ hotel_id: hotelID }, {
    hotel: 1,
    image: 1,
    introduction: 1
  })
  ctx.body = {
    code: 0,
    hotelInfo: {
      hotel: result.hotel,
      image: result.image[0],
      introduction: result.introduction
    }
  }
})

router.get('/getPlaceInfoOfBook', async (ctx) => {
  const { id: placeID } = ctx.request.query
  const result = await PlaceModel.findOne({ place_id: placeID }, {
    place: 1,
    image: 1,
    introduction: 1
  })
  ctx.body = {
    code: 0,
    placeInfo: {
      place: result.place,
      image: result.image[0],
      introduction: result.introduction
    }
  }
})

router.get('/getLineOfCity', async (ctx) => {
  const { cityID } = ctx.request.query
  const currentPage = parseInt(ctx.request.query.currentPage)
  const pageSize = parseInt(ctx.request.query.pageSize)
  const total = await LineModel.countDocuments({ city_id: cityID })
  const skip = (currentPage - 1) * pageSize
  const limit = total - skip >= pageSize ? pageSize : total - skip
  const result = await LineModel.find({ city_id: cityID }).skip(skip).limit(limit)
  if (result) {
    ctx.body = {
      code: 0,
      lineList: result.map((item) => {
        return {
          line: item.line,
          period: item.period,
          the_best_season: item.season,
          point: item.point,
          tips: item.tips,
          summary: item.summary
        }
      }),
      total: total
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '暂无相关数据！'
    }
  }
})

export default router
