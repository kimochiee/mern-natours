import { Router } from 'express'
import {
  createReview,
  deleteReview,
  getAllReviews,
  getMyReviews,
  getReview,
  setTourUserIds,
  updateReview
} from '../controllers/review.controller.js'
import { protect, restrictTo } from '../middlewares/auth.middleware.js'

const router = Router({ mergeParams: true })

// current user revierws
router.use(protect)
router.route('/myReviews').get(getMyReviews)

// crud reviews
router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview)

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview)

export default router
