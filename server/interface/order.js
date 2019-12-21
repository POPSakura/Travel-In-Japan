import Router from 'koa-router'
import HotelModel from '../dbs/models/hotels.js'
import OrderModel from '../dbs/models/orders.js'

const router = new Router({
  prefix: '/order'
})

router.post('/addOrderOfHotel', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { name, email, telephone, remark, time, hotelID, hotel, kind, price, quantity, total } = ctx.request.body
    const { user_id: userID } = ctx.session.passport.user
    const order = {
      order_id: Math.round((Math.random().toFixed(17)) * Math.pow(10, 17)).toString(),
      series_type: 'hotel',
      series_id: hotelID,
      user_id: userID,
      series: hotel,
      kind: kind,
      price: price,
      quantity: quantity,
      total: total,
      name: name,
      telephone: telephone,
      email: email,
      remark: remark,
      book_time: time,
      status: 0
    }
    const orderResult = await OrderModel.create(order)
    const hotelResult = await HotelModel.updateOne({ hotel_id: hotelID }, {
      $inc: { product_count: 1 }
    })
    if (orderResult && hotelResult) {
      ctx.body = {
        code: 0,
        msg: '预订成功！',
        order_id: orderResult.order_id
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '预订失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.post('/cancelOrderOfHotel', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { hotelID, orderID } = ctx.request.body
    const orderResult = await OrderModel.updateOne({ order_id: orderID }, {
      $set: { status: -1 }
    })
    const hotelResult = await HotelModel.updateOne({ hotel_id: hotelID }, {
      $inc: { product_count: -1 }
    })
    if (orderResult && hotelResult) {
      ctx.body = {
        code: 0,
        msg: '取消订单成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '取消订单失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.get('/checkHotelOrderStatus', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { id: hotelID } = ctx.request.query
    const { user_id: userID } = ctx.session.passport.user
    const result = await OrderModel.find({ series_id: hotelID, user_id: userID, status: 0 })
    if (!result.length) {
      ctx.body = {
        code: 0,
        msg: '没有待支付的订单'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请处理待支付的订单！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.post('/addOrderOfPlace', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { name, email, telephone, remark, time, placeID, place, kind, price, quantity, total } = ctx.request.body
    const { user_id: userID } = ctx.session.passport.user
    const order = {
      order_id: Math.round((Math.random().toFixed(17)) * Math.pow(10, 17)).toString(),
      series_type: 'place',
      series_id: placeID,
      user_id: userID,
      series: place,
      kind: kind,
      price: price,
      quantity: quantity,
      total: total,
      name: name,
      telephone: telephone,
      email: email,
      remark: remark,
      book_time: time,
      status: 0
    }
    const orderResult = await OrderModel.create(order)
    if (orderResult) {
      ctx.body = {
        code: 0,
        msg: '预订成功！',
        order_id: orderResult.order_id
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '预订失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.get('/checkPlaceOrderStatus', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { id: placeID } = ctx.request.query
    const { user_id: userID } = ctx.session.passport.user
    const result = await OrderModel.find({ series_id: placeID, user_id: userID, status: 0 })
    if (!result.length) {
      ctx.body = {
        code: 0,
        msg: '没有待支付的订单'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请处理待支付的订单！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.post('/cancelOrder', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { orderID } = ctx.request.body
    const result = await OrderModel.updateOne({ order_id: orderID }, {
      $set: { status: -1 }
    })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '取消订单成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '取消订单失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.get('/getCurrentOrder', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { orderID } = ctx.request.query
    const result = await OrderModel.findOne({ order_id: orderID }, {
      series: 1,
      kind: 1,
      price: 1,
      quantity: 1,
      name: 1,
      telephone: 1,
      email: 1,
      remark: 1,
      book_time: 1,
      total: 1
    })
    if (result) {
      ctx.body = {
        code: 0,
        orderInfo: result
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '查询不到相关信息，请移步个人中心查看！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.post('/payOrder', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { orderID } = ctx.request.body
    const result = await OrderModel.updateOne({ order_id: orderID }, {
      $set: { status: 1, pay_time: new Date().getTime() }
    })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '支付成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '支付失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

router.get('/getOrder', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { user_id: userID } = ctx.session.passport.user
    const { currentPage, pageSize } = ctx.request.query
    const total = await OrderModel.countDocuments({ user_id: userID })
    const skip = (currentPage - 1) * pageSize
    const limit = total - skip >= pageSize ? pageSize : total - skip
    const result = await OrderModel.find({ user_id: userID }).skip(skip).limit(limit)
    if (result) {
      ctx.body = {
        code: 0,
        orderList: result,
        total: total
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '查询失败！请稍后重试！'
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
