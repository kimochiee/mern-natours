import Stripe from 'stripe'
import { env } from '~/config/env'
import { Tour } from '~/models/tour.model'
import { catchAsync } from '~/utils/catchAsync'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './factory.handler'
import { Booking } from '~/models/booking.model'
import { ApiError } from '~/utils/ApiError'
import { ApiFeatures } from '~/utils/ApiFeatures'

const stripe = new Stripe(env.stripe.SECRET_KEY)

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) get currently booked tour
  const tour = await Tour.findById(req.params.tourId)

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.headers.origin}/account?tab=my-tours`,
    // success_url: `${req.headers.origin}/success?tour=${tour._id}&user=${req.user._id}&price=${tour.price}`,
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/tour/${tour._id}`,
    customer_email: req.user.email,
    client_reference_id:
      req.params.tourId + ' ' + req.user._id + ' ' + tour.price,
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            images: [
              tour.imageCover.startsWith('http')
                ? tour.imageCover
                : `${req.protocol}://${req.get('host')}/img/tours/${
                    tour.imageCover
                  }`
            ],
            description: tour.summary
          }
        },
        quantity: 1
      }
    ],
    mode: 'payment'
  })

  // 3) send session to client
  res.status(200).json({
    status: 'success',
    session
  })
})

export const createBookingCheckout = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(req.body.session_id)

  const bookingData = {
    tour: session.client_reference_id.split(' ')[0],
    user: session.client_reference_id.split(' ')[1],
    price: session.client_reference_id.split(' ')[2],
    payment_intent: session.payment_intent
  }

  const existingBooking = await Booking.findOne(bookingData)

  if (existingBooking) {
    throw new ApiError(400, 'Booking already exists.')
  }

  const booking = await Booking.create(bookingData)

  if (!booking) {
    throw new ApiError(400, 'Booking failed.')
  }

  res.status(200).json({ status: 'success', session })
})

export const getMyBookings = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Booking.find({ user: req.user._id }).lean(),
    req.query
  )

  const docs = await features.filter().sort().limitFields().paginate().query
  const totalDocs = await Booking.countDocuments({ user: req.user._id })

  res.status(200).json({
    status: 'success',
    totalDocs,
    maxDocs: 6,
    data: { bookings: docs }
  })
})

export const refundBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.bookingId)

  if (!booking) {
    throw new ApiError(404, 'No booking found with that ID')
  }

  const session = await stripe.refunds.create({
    payment_intent: booking.payment_intent
  })

  res.status(200).json({ status: 'success', session })
})

export const createBooking = createOne(Booking)
export const getBooking = getOne(Booking)
export const getAllBookings = getAll(Booking)
export const updateBooking = updateOne(Booking)
export const deleteBooking = deleteOne(Booking)
