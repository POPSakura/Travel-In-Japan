import fs from 'fs'
import Router from 'koa-router'
import PlaceModel from '../dbs/models/places.js'
import HotelModel from '../dbs/models/hotels.js'
import CommentModel from '../dbs/models/comments.js'
import LikeModel from '../dbs/models/likes.js'
import upload from './utils/uploadCommentImage.js'

const router = new Router({
  prefix: '/comment'
})

// 上传评论照片接口
router.post('/uploadCommentImage', upload.single('file'), async (ctx) => {
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

// 删除评论照片接口
router.post('/removeCommentImage', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { path } = ctx.request.body
    const error = fs.unlinkSync(`W:/nginx-1.16.1/home/image/${path}`)
    if (error) {
      ctx.body = {
        code: -1,
        msg: '删除失败！'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '删除成功！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 景点评论接口
router.post('/addCommentOfPlace', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { placeID, content, grade, images } = ctx.request.body
    const { _id: userID, username, head } = ctx.session.passport.user
    const comment = {
      comment_id: Math.round((Math.random().toFixed(15)) * Math.pow(10, 16)).toString(),
      series_id: placeID,
      user_id: userID,
      user: username,
      head: head,
      content: content,
      grade: grade,
      image: images
    }
    const setCommentFlag = await CommentModel.create(comment)
    const setCommentCountFlag = await PlaceModel.updateOne({
      place_id: placeID
    }, { $inc: { comment_count: 1 } })
    if (setCommentFlag && setCommentCountFlag) {
      ctx.body = {
        code: 0,
        msg: '评论成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '评论失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 获取当前景点评论接口
router.get('/getCommentOfPlace', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { _id: userID } = ctx.session.passport.user
    const placeID = parseInt(ctx.request.query.placeID)
    const currentPage = parseInt(ctx.request.query.currentPage)
    const pageSize = parseInt(ctx.request.query.pageSize)
    const total = await CommentModel.countDocuments({ series_id: placeID })
    if (!total) {
      ctx.body = {
        code: -1,
        msg: '暂无评论！',
        total: 0
      }
      return false
    }
    const skip = (currentPage - 1) * pageSize
    const limit = total - skip >= pageSize ? pageSize : total - skip
    const result = await CommentModel.aggregate([
      { $match: { series_id: placeID } },
      {
        $lookup: {
          from: 'likes',
          localField: 'comment_id',
          foreignField: 'comment_id',
          as: 'likes'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'comment_id',
          foreignField: 'superior_id',
          as: 'replys'
        }
      },
      { $skip: skip },
      { $limit: limit }
    ])
    const commentList = result.map((comment) => {
      const user = comment.likes.find(like => like.user_id === userID)
      const status = user ? user.status : 0
      return {
        comment_id: comment.comment_id,
        head: comment.head,
        user: comment.user,
        grade: comment.grade,
        like_status: status,
        like_count: comment.like_count,
        content: comment.content,
        images: comment.image.slice(0, 4),
        pubdate: comment.pubdate,
        reply: comment.replys.map((reply) => {
          return {
            user: reply.user,
            head: reply.head,
            content: reply.content,
            pubdate: reply.pubdate
          }
        })
      }
    })
    ctx.body = {
      code: 0,
      commentList: commentList,
      total
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 酒店评论接口
router.post('/addCommentOfHotel', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { hotelID, content, grade, images } = ctx.request.body
    const { _id: userID, username, head } = ctx.session.passport.user
    const comment = {
      comment_id: Math.round((Math.random().toFixed(15)) * Math.pow(10, 16)).toString(),
      series_id: hotelID,
      user_id: userID,
      user: username,
      head: head,
      content: content,
      grade: grade,
      image: images
    }
    const setCommentFlag = await CommentModel.create(comment)
    const gradeTotal = await CommentModel.aggregate([
      {
        $match: { series_id: parseInt(hotelID) }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$grade' }
        }
      }
    ])
    const commentTotal = await CommentModel.countDocuments({ series_id: hotelID })
    const gradeAvg = gradeTotal[0].total / commentTotal
    console.log(gradeAvg)
    const setCommentCountFlag = await HotelModel.updateOne({
      hotel_id: hotelID
    }, { $inc: { comment_count: 1 }, $set: { grade: gradeAvg } })
    if (setCommentFlag && setCommentCountFlag) {
      ctx.body = {
        code: 0,
        msg: '评论成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '评论失败！请稍后重试！'
      }
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 获取当前酒店评论接口
router.get('/getCommentOfHotel', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { _id: userID } = ctx.session.passport.user
    const hotelID = parseInt(ctx.request.query.hotelID)
    const currentPage = parseInt(ctx.request.query.currentPage)
    const pageSize = parseInt(ctx.request.query.pageSize)
    const total = await CommentModel.countDocuments({ series_id: hotelID })
    if (!total) {
      ctx.body = {
        code: -1,
        msg: '暂无评论！',
        total: 0
      }
      return false
    }
    const skip = (currentPage - 1) * pageSize
    const limit = total - skip >= pageSize ? pageSize : total - skip
    const result = await CommentModel.aggregate([
      { $match: { series_id: hotelID } },
      {
        $lookup: {
          from: 'likes',
          localField: 'comment_id',
          foreignField: 'comment_id',
          as: 'likes'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'comment_id',
          foreignField: 'superior_id',
          as: 'replys'
        }
      },
      { $skip: skip },
      { $limit: limit }
    ])
    const commentList = result.map((comment) => {
      const user = comment.likes.find(like => like.user_id === userID)
      const status = user ? user.status : 0
      return {
        comment_id: comment.comment_id,
        head: comment.head,
        user: comment.user,
        grade: comment.grade,
        like_status: status,
        like_count: comment.like_count,
        content: comment.content,
        images: comment.image.slice(0, 4),
        pubdate: comment.pubdate,
        reply: comment.replys.map((reply) => {
          return {
            user: reply.user,
            head: reply.head,
            content: reply.content,
            pubdate: reply.pubdate
          }
        })
      }
    })
    ctx.body = {
      code: 0,
      commentList: commentList,
      total
    }
  } else {
    ctx.body = {
      code: -2,
      msg: '您尚未登录！请先登录！'
    }
  }
})

// 回复接口
router.post('/addReply', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { commentID, content } = ctx.request.body
    const { _id: userID, username, head } = ctx.session.passport.user
    const reply = {
      user_id: userID,
      user: username,
      head: head,
      comment_id: Math.round((Math.random().toFixed(15)) * Math.pow(10, 16)).toString(),
      content: content,
      superior_id: commentID
    }
    const addReplyFlag = await CommentModel.create(reply)
    if (addReplyFlag) {
      ctx.body = {
        code: 0,
        msg: '回复成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '回复失败！请稍后重试！'
      }
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
    const { _id: userID } = ctx.session.passport.user
    const { commentID } = ctx.request.body
    const result = await LikeModel.findOne({
      comment_id: commentID,
      user_id: userID
    })
    if (result) {
      const setLikeFlag = await LikeModel.updateOne({
        comment_id: commentID,
        user_id: userID
      }, { $set: { status: result.status === 0 ? 1 : 0 } })
      const setLikeCountFlag = await CommentModel.updateOne({
        comment_id: commentID
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
        comment_id: commentID,
        user_id: userID,
        status: 1
      }
      const setLikeFlag = await LikeModel.create(like)
      const setLikeCountFlag = await CommentModel.updateOne({
        comment_id: commentID
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

export default router
