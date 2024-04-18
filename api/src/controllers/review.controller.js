import { Review } from '~/models/review.model'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './factory.handler'
import { catchAsync } from '~/utils/catchAsync'
import { ApiFeatures } from '~/utils/ApiFeatures'

export const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  next()
}

export const getMyReviews = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Review.find({ user: req.user._id }).lean(),
    req.query
  )

  const [docs, totalDocs] = await Promise.all([
    features.filter().sort().limitFields().paginate().query,
    Review.countDocuments({ user: req.user._id })
  ])

  res.status(200).json({
    status: 'success',
    totalDocs,
    maxDocs: 6,
    data: { reviews: docs }
  })
})

export const getAllReviews = getAll(Review)
export const getReview = getOne(Review)
export const createReview = createOne(Review)
export const updateReview = updateOne(Review)
export const deleteReview = deleteOne(Review)
