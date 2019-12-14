import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CitySchema = new Schema({
  city_id: { // 城市ID主键
    type: Number,
    required: true,
    unique: true
  },
  city: { // 城市名
    type: String,
    required: true,
    trim: true
  },
  county_id: { // 区县ID外键
    type: Number,
    required: true
  },
  introduction: { // 城市介绍
    type: String,
    default: '暂无介绍',
    trim: true
  }
})

export default mongoose.model('City', CitySchema)
