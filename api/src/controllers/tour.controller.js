import { Tour } from '~/models/tour.model'
import { ApiError } from '~/utils/ApiError'
import { ApiFeatures } from '~/utils/ApiFeatures'
import { catchAsync } from '~/utils/catchAsync'

export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

  next()
}

export const getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)

  const tours = await features.filter().sort().limitFields().paginate().query

  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } })
})

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews')

  if (!tour) {
    return next(new ApiError(404, 'No tour found with that ID'))
  }

  res.status(200).json({ status: 'success', data: { tour } })
})

export const createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body)

  res.status(201).json({ status: 'success', data: { tour } })
})

export const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!tour) {
    return next(new ApiError(404, 'No tour found with that ID'))
  }

  res.status(200).json({ status: 'success', data: { tour } })
})

export const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id)

  if (!tour) {
    return next(new ApiError(404, 'No tour found with that ID'))
  }

  res.status(204).json({ status: 'success', data: null })
})

export const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 0 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ])

  res.status(200).json({ status: 'success', data: { stats } })
})

export const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: `${year}-01-01`,
          $lte: `${year}-12-31`
        }
      }
    },
    {
      $group: {
        _id: { $month: { $toDate: '$startDates' } },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numTourStarts: -1 }
    }
  ])

  res.status(200).json({ status: 'success', data: { plan } })
})
