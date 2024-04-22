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
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price']
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'paid', 'canceled', 'refunded'],
        message:
          'Booking status can be - pending, paid, canceled and refunded only'
      }
    },
    payment_intent: String,
    tourStartDate: {
      type: Date,
      required: [true, 'Booking must have a start date']
    },
    tickets: {
      type: Number,
      required: [true, 'Booking must have a ticket quantity']
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
    path: 'tour',
    select: 'name imageCover duration'
  }).populate({
    path: 'review'
  })

  next()
})

export const Booking = mongoose.model('Booking', bookingSchema)
