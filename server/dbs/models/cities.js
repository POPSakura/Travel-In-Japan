import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CiSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  city: {
    type: String,
    minlength: 0,
    maxlength: 50,
    required: true,
    trim: true
  }
})
const CitySchema = new Schema({
  id: {
    type: Number,
    min: 1,
    max: 50,
    unique: true,
    required: true
  },
  cities: [CiSchema]
})

export default mongoose.model('City', CitySchema)
