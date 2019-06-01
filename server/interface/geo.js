import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'

const router = new Router({
  prefix: '/geo'
})

// 获取日本县级接口
router.get('/getCounties', async (ctx) => {
  const result = await CountyModel.find()
  if (result.length) {
    ctx.body = {
      code: 0,
      counties: result.map((item) => {
        return {
          id: item.id,
          local: item.local,
          county: item.county
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
    id: ctx.params.id
  })
  if (result.length) {
    ctx.body = {
      code: 0,
      cities: result[0].cities.map((item) => {
        return {
          value: item.id,
          label: item.city
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
    const all = []
    result.forEach((group) => {
      group.cities.forEach((item) => {
        all.push({
          value: item.city,
          id: item.id
        })
      })
    })
    ctx.body = {
      code: 0,
      allCities: all
    }
  } else {
    ctx.body = {
      code: -1,
      allCities: []
    }
  }
})

export default router
