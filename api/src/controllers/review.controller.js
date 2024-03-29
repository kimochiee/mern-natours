import { Review } from '~/models/review.model'
import { catchAsync } from '~/utils/catchAsync'

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews }
  })
})

export const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  const review = await Review.create(req.body)

  res.status(201).json({
    status: 'success',
    data: { review }
  })
})

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  res.status(200).json({
    status: 'success',
    data: { review }
  })
})

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: { review }
  })
})

export const deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id)

  res.status(204).json({
    status: 'success',
    data: null
  })
})