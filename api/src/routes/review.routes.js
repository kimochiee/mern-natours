import express from 'express'
import {
  createReview,
  getAllReviews
} from '../controllers/review.controller.js'
import { protect, restrictTo } from '../middlewares/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview)

export default router
