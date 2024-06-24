import { Router } from 'express'
const router = Router()

import userRouter from './user.routes'
import tourRouter from './tour.routes'
import reviewRouter from './review.routes'
import bookingRouter from './booking.routes'
import { ApiError } from '~/utils/ApiError'

router.use('/check', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running' })
})
router.use('/users', userRouter)
router.use('/tours', tourRouter)
router.use('/reviews', reviewRouter)
router.use('/bookings', bookingRouter)
router.all('*', (req, res, next) =>
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`))
)

export default router
