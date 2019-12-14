import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CommentSchema = new Schema({
  comment_id: { // 评论ID主键
    type: String,
    required: true,
    unique: true
  },
  series_id: { // 被评论系列ID外键 [景点、酒店、美食等]
    type: Number
  },
  user_id: { // 评论用户ID外键
    type: String,
    required: true,
    trim: true
  },
  user: { // 评论用户名称
    type: String,
    required: true
  },
  head: { // 评论用户头像
    type: String,
    required: true
  },
  content: { // 评论内容
    type: String,
    required: true,
    trim: true
  },
  grade: { // 评论分数
    type: Number
  },
  image: { // 评论附带图片
    type: [String],
    default: []
  },
  pubdate: { // 评论发布时间
    type: Date,
    default: new Date().getTime()
  },
  like_count: { // 评论点赞数量
    type: Number,
    default: 0
  },
  superior_id: { // 回复的评论ID(若有值则为回复，没有则为评论)
    type: String,
    default: '0'
  }
})

export default mongoose.model('Comment', CommentSchema)
