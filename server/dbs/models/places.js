import mongoose from 'mongoose'

const Schema = mongoose.Schema
const PlaceSchema = new Schema({
  place_id: { // 景点ID主键
    type: Number,
    required: true,
    unique: true
  },
  place: { // 景点名
    type: String,
    required: true,
    trim: true
  },
  county_id: { // 区县ID外键
    type: Number,
    required: true
  },
  city_id: { // 城市ID外键
    type: Number,
    required: true
  },
  area_id: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  hot: {
    type: Boolean,
    default: false
  },
  english_place: { // 景点英文名
    type: String,
    required: true,
    trim: true
  },
  introduction: { // 景点介绍
    type: String,
    default: '暂无介绍',
    trim: true
  },
  image: { // 景点图片
    type: [String],
    default: []
  },
  concerns: { // 景点关注点
    type: [String],
    required: true
  },
  telephone: { // 景点电话
    type: String,
    required: true
  },
  website: { // 景点网址
    type: String,
    required: true,
    trim: true
  },
  visit_time: { // 景点用时参考
    type: String,
    required: true,
    trim: true
  },
  comment_count: { // 景点评论条数
    type: Number,
    default: 0
  },
  traffic: { // 交通列表
    type: [String],
    required: true
  },
  ticket: { // 门票列表
    type: [String],
    required: true
  },
  open_time: { // 开放时间
    type: [String],
    required: true
  },
  inside_place: {
    type: [Number],
    default: []
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true,
    trim: true
  },
  longitude: {
    type: Number,
    required: true,
    trim: true
  },
  nearby_place: {
    type: [Number],
    default: []
  },
  nearby_traffic: {
    type: [Number],
    default: []
  }
})

export default mongoose.model('Place', PlaceSchema)
