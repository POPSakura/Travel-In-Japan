import mongoose from 'mongoose'

const Schema = mongoose.Schema
const NoteSchema = new Schema({
  note_id: {
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
  user_id: {
    type: String,
    required: true,
    trim: true
  },
  note: {
    type: String,
    required: true,
    trim: true
  },
  pubdate: {
    type: Date,
    default: new Date().getTime()
  },
  describe: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  price_average: {
    type: Number
  },
  day: {
    type: Number
  },
  person: {
    type: Number
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  scan_count: {
    type: Number,
    default: 0
  },
  like_count: {
    type: Number,
    default: 0
  }
})

export default mongoose.model('Note', NoteSchema)
