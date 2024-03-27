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

const router = Router()

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin'), getMonthlyPlan)

router.route('/').get(getAllTours).post(protect, createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin'), updateTour)
  .delete(protect, restrictTo('admin'), deleteTour)

export default router
