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
import { Booking } from '~/models/booking.model'
import { ApiError } from '~/utils/ApiError'

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

// export const createReview = createOne(Review)
export const createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body)
  await Booking.findOneAndUpdate(
    { tour: review.tour, user: review.user },
    { review: review._id }
  )

  res.status(201).json({ status: 'success', data: review })
})

export const updateReview = updateOne(Review)

// export const deleteReview = deleteOne(Review)
export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id)

  if (!review) {
    throw new ApiError(404, `No ${Review} found with that ID`)
  }

  await Booking.findOneAndUpdate(
    { tour: review.tour, user: review.user },
    { review: null }
  )

  res.status(200).json({ status: 'success' })
})
