import mongoose from 'mongoose'

const Schema = mongoose.Schema
const LikeSchema = new Schema({
  like_id: { // 赞ID主键
    type: String,
    required: true,
    unique: true
  },
  comment_id: { // 评论ID外键
    type: String,
    required: true
  },
  user_id: { // 点赞用户ID外键
    type: String,
    required: true,
    trim: true
  },
  status: { // 点赞状态 [0--未点赞，1--已点赞]
    type: Number,
    default: 0
  }
})

export default mongoose.model('Like', LikeSchema)
