import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'
import PlaceModel from '../dbs/models/places.js'
import AreaModel from '../dbs/models/areas.js'

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
  const { id } = ctx.request.query
  const { city, introduction } = await CityModel.findOne({ city_id: id }, { city: 1, introduction: 1 })
  const data = await PlaceModel.find({ city_id: id, top: { $ne: 0 } }, {
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
  const hotPlace = await PlaceModel.find({ city_id: id, hot: true }, {
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

// 获取某地区全部景点
router.get('/getCityOfAllPlace', async (ctx) => {
  const { id, pageSize, currentPage } = ctx.request.query
  const total = await PlaceModel.countDocuments({ city_id: id })
  if (!total) {
    ctx.body = {
      code: -1,
      msg: '未找到相关景点'
    }
    return
  }
  const dataSize = total - (currentPage - 1) * pageSize >= pageSize
    ? parseInt(pageSize)
    : total - (currentPage - 1) * pageSize
  const result = await PlaceModel.find({ city_id: id }, {
    place: 1,
    place_id: 1,
    image: 1
  }).skip((currentPage - 1) * pageSize).limit(dataSize)
  ctx.body = {
    code: 0,
    allPlace: result.map((item) => {
      return {
        place: item.place,
        place_id: item.place_id,
        image: item.image[0]
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
      sub_img: [
        result.image[1],
        result.image[2]
      ],
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
  const { area_id: areaId } = await PlaceModel.findOne({ place_id: placeID }, { area_id: 1 })
  if (areaId === 0) {
    ctx.body = {
      code: -1,
      areaInfo: {}
    }
    return
  }
  const result = await AreaModel.findOne({ area_id: areaId }, {
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
      ]
    }
  }
})

export default router
