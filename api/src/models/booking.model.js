import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a tour']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user']
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price']
    },
    paid: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Prevent duplicate bookings
bookingSchema.index({ tour: 1, user: 1 }, { unique: true })

// Populate user and tour
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email'
  }).populate({
    path: 'tour',
    select: 'name'
  })

  next()
})

export const Booking = mongoose.model('Booking', bookingSchema)
