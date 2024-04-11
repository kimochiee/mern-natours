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

const stripe = new Stripe(env.stripe.SECRET_KEY)

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) get currently booked tour
  const tour = await Tour.findById(req.params.tourId)

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.headers.origin}/account?tab=my-tours?alert=booking`,
    cancel_url: `${req.headers.origin}/tour/${tour._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
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

export const createBookingCheckout = catchAsync(async (req, res, next) => {})

export const createBooking = createOne(Booking)
export const getBooking = getOne(Booking)
export const getAllBookings = getAll(Booking)
export const updateBooking = updateOne(Booking)
export const deleteBooking = deleteOne(Booking)
