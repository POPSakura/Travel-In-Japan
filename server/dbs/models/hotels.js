import mongoose from 'mongoose'

const Schema = mongoose.Schema
const RoomSchema = new Schema({
  kind: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
const HotelSchema = new Schema({
  hotel_id: { // 酒店ID主键
    type: Number,
    required: true,
    unique: true
  },
  hotel: { // 酒店名
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
  area_id: { // 区域ID外键
    type: Number,
    default: 0
  },
  top: { // 是否为 top 酒店
    type: Number,
    default: 0
  },
  hot: { // 是否为热门酒店
    type: Boolean,
    default: false
  },
  english_hotel: { // 酒店英文名
    type: String,
    required: true,
    trim: true
  },
  introduction: { // 酒店介绍
    type: String,
    default: '暂无介绍',
    trim: true
  },
  image: { // 酒店图片
    type: [String],
    default: []
  },
  concerns: { // 酒店关注点
    type: [String],
    required: true
  },
  comment_count: { // 酒店评论条数
    type: Number,
    default: 0
  },
  product_count: { // 酒店销量条数
    type: Number,
    default: 0
  },
  grade: { // 酒店评分数
    type: Number,
    default: 0
  },
  brand: {
    type: String,
    default: '',
    trim: true
  },
  facility: {
    type: [String],
    default: []
  },
  kind: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  room: {
    type: [RoomSchema],
    default: []
  },
  enter_time: {
    type: String,
    required: true
  },
  leave_time: {
    type: String,
    required: true
  },
  room_count: {
    type: Number,
    required: true
  },
  nearby_place: {
    type: [Number],
    default: []
  },
  nearby_hotel: {
    type: [Number],
    default: []
  },
  nearby_traffic: {
    type: [Number],
    default: []
  }
})

export default mongoose.model('Hotel', HotelSchema)
