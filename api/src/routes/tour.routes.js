import { Router } from 'express'
import {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getTourDistances
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
  .get(protect, restrictTo('admin', 'lead-guide'), getMonthlyPlan)

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin)
router.route('/distances/:latlng/unit/:unit').get(getTourDistances)

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

export default router
