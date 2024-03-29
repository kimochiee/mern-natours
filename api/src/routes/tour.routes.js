import { Router } from 'express'
import {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan
} from '~/controllers/tour.controller'
import { protect, restrictTo } from '~/middlewares/auth.middleware'
import reviewRouter from '~/routes/review.routes'

const router = Router()

// Nested review routes
router.use('/:tourId/reviews', reviewRouter)

// Tour routes
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin'), getMonthlyPlan)

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin'), createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin'), updateTour)
  .delete(protect, restrictTo('admin'), deleteTour)

export default router
