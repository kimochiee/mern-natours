import { Router } from 'express'
import {
  createBooking,
  createBookingCheckout,
  deleteBooking,
  getAllBookings,
  getBooking,
  createCheckoutSession,
  getMyBookings,
  refundBooking,
  updateBooking
} from '~/controllers/booking.controller'
import { protect, restrictTo } from '~/middlewares/auth.middleware'

const router = Router()

// get checkout session
router.use(protect)
router.route('/checkout-session/:tourId').post(createCheckoutSession)

// current user bookings
router.route('/myBookings').get(getMyBookings)
router.route('/createBookingCheckout').post(createBookingCheckout)
router.route('/refund/:bookingId').delete(refundBooking)

// crud bookings
router.use(restrictTo('admin', 'lead-guide'))
router.route('/').get(getAllBookings).post(createBooking)
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking)

export default router
