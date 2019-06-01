import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CountySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 50
  },
  local: {
    type: String,
    required: true,
    trim: true,
    minlength: 0,
    maxlength: 50
  },
  county: {
    type: String,
    required: true,
    trim: true,
    minlength: 0,
    maxlength: 50
  }
})

export default mongoose.model('County', CountySchema)
