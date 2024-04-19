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

export const createCheckoutSession = catchAsync(async (req, res, next) => {
  const { date, tickets } = req.body
  const { tourId } = req.params

  if (!date || !tickets) {
    throw new ApiError(400, 'Please provide a date and ticket quantity')
  }

  // get certain booking by date
  const booking = await Booking.findOne({
    tour: tourId,
    user: req.user._id
  })

  if (booking) {
    throw new ApiError(400, 'You already booked this tour')
  }

  // get currently booked tour
  const tour = await Tour.findById(tourId)

  // check tickets availability
  const dateObj = tour.startDates.find(
    (d) => d.dateValue.getTime() === new Date(date).getTime()
  )

  const availableTickets = tour.maxGroupSize - dateObj.participants

  if (tickets > availableTickets) {
    throw new ApiError(400, 'Not enough tickets available')
  }

  // // create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/tour/${tour._id}`,
    customer_email: req.user.email,
    client_reference_id:
      req.params.tourId + ' ' + req.user._id + ' ' + tour.price,
    line_items: [
      {
        quantity: tickets,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary
          }
        }
      }
    ],
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: {
          tourStartDate: date,
          tickets
        }
      }
    },
    mode: 'payment'
  })

  // // send session to client
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
    payment_intent: session.payment_intent,
    tourStartDate: session.invoice_creation.invoice_data.metadata.tourStartDate,
    tickets: session.invoice_creation.invoice_data.metadata.tickets,
    status: 'paid'
  }

  const tour = await Tour.findById(bookingData.tour)

  const existingBooking = await Booking.findOne(bookingData)

  if (existingBooking) {
    throw new ApiError(400, 'Booking already exists.')
  }

  const booking = await Booking.create(bookingData)

  if (!booking) {
    throw new ApiError(400, 'Booking failed.')
  }

  tour.startDates.find(
    (el) =>
      el.dateValue.getTime() === new Date(bookingData.tourStartDate).getTime()
  ).participants += bookingData.tickets * 1

  await tour.save()

  res.status(200).json({ status: 'success', session })
})

export const getMyBookings = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Booking.find({ user: req.user._id }).lean(),
    req.query
  )

  const [docs, totalDocs] = await Promise.all([
    features.filter().sort().limitFields().paginate().query,
    Booking.countDocuments({ user: req.user._id })
  ])

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
