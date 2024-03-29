import { Router } from 'express'
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview
} from '../controllers/review.controller.js'
import { protect, restrictTo } from '../middlewares/auth.middleware.js'

const router = Router({ mergeParams: true })

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview)

router
  .route('/:id')
  .get(getReview)
  .patch(protect, restrictTo('user'), updateReview)
  .delete(protect, restrictTo('user'), deleteReview)

export default router
