import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CountySchema = new Schema({
  county_id: { // 区县ID主键
    type: Number,
    required: true,
    unique: true
  },
  county: { // 区县名
    type: String,
    required: true,
    trim: true
  },
  local: { // 所属区域
    type: String,
    required: true,
    trim: true
  },
  introduction: { // 区县介绍
    type: String,
    default: '暂无介绍',
    trim: true
  }
})

export default mongoose.model('County', CountySchema)
