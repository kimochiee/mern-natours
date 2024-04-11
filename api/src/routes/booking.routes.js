import { Router } from 'express'
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  getCheckoutSession,
  updateBooking
} from '~/controllers/booking.controller'
import { protect, restrictTo } from '~/middlewares/auth.middleware'

const router = Router()

// get checkout session
router.use(protect)
router.route('/checkout-session/:tourId').get(getCheckoutSession)

// crud bookings
router.use(restrictTo('admin', 'lead-guide'))
router.route('/').get(getAllBookings).post(createBooking)
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking)

export default router
