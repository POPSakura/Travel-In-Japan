import mongoose from 'mongoose'

const Schema = mongoose.Schema
const PointSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
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
  }
})
const LineSchema = new Schema({
  line_id: {
    type: Number,
    required: true,
    unique: true
  },
  county_id: {
    type: Number,
    required: true
  },
  city_id: {
    type: Number,
    required: true
  },
  area_id: {
    type: Number,
    default: 0
  },
  line: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true,
    trim: true
  },
  season: {
    type: String,
    required: true,
    trim: true
  },
  tips: {
    type: String,
    default: '无',
    trim: true
  },
  summary: {
    type: String,
    default: '无',
    trim: true
  },
  point: {
    type: [PointSchema],
    required: true
  }
})

export default mongoose.model('Line', LineSchema)
