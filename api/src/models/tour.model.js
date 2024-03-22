import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  durations: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
  // secretTour: {
  //   type: Boolean,
  //   default: false
  // },
  // startLocation: {
  //   // GeoJSON
  //   type: {
  //     type: String,
  //     default: 'Point',
  //     enum: ['Point']
  //   },
  //   coordinates: [Number],
  //   address: String,
  //   description: String
  // },
  // locations: [
  //   {
  //     type: {
  //       type: String,
  //       default: 'Point',
  //       enum: ['Point']
  //     },
  //     coordinates: [Number],
  //     address: String,
  //     description: String,
  //     day: Number
  //   }
  // ],
  // guides: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User'
  //   }
  // ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Review'
  //   }
  // ]
})

export const Tour = mongoose.model('Tour', tourSchema)
