import mongoose from 'mongoose'

const Schema = mongoose.Schema
const OrderSchema = new Schema({
  order_id: {
    type: String,
    required: true,
    unique: true
  },
  series_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true,
    trim: true
  },
  series: {
    type: String,
    required: true
  },
  series_type: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  remark: {
    type: String,
    default: ''
  },
  book_time: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: new Date().getTime()
  },
  pay_time: {
    type: Date
  },
  status: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Order', OrderSchema)
