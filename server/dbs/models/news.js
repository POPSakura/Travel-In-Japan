import mongoose from 'mongoose'

const Schema = mongoose.Schema
const NewsSchema = new Schema({
  news_id: {
    type: String,
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
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: [String],
    required: true,
    trim: true
  },
  image: {
    type: [String],
    required: true,
    trim: true
  },
  scan_count: {
    type: Number,
    default: 0
  },
  like_count: {
    type: Number,
    default: 0
  },
  pubdate: {
    type: Date,
    default: new Date().getTime()
  }
})

export default mongoose.model('News', NewsSchema)
