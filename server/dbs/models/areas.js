import mongoose from 'mongoose'

const Schema = mongoose.Schema
const PathSchema = new Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
})
const AreaSchema = new Schema({
  area_id: {
    type: Number,
    required: true,
    unique: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  city_id: {
    type: Number,
    required: true
  },
  introduction: {
    type: String,
    default: '暂无介绍',
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
  paths: {
    type: [PathSchema],
    default: []
  }
})

export default mongoose.model('Area', AreaSchema)
