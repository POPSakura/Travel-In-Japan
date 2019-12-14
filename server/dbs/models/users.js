import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
    default: ''
  },
  sex: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now()
  },
  city: {
    type: String,
    minlength: 0,
    maxlength: 10,
    default: ''
  },
  head: {
    type: String,
    default: '/head/pic1.jpg'
  },
  tel: {
    type: Number,
    default: ''
  },
  person_sign: {
    type: String,
    minlength: 0,
    maxlength: 500,
    default: ''
  }
})

export default mongoose.model('User', UserSchema)
