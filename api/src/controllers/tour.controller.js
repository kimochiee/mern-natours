import { Tour } from '~/models/tour.model'
import { catchAsync } from '~/utils/catchAsync'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './factory.handler'
import { ApiError } from '~/utils/ApiError'

export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

  next()
}

export const getAllTours = getAll(Tour)
export const getTour = getOne(Tour, { path: 'reviews' })
export const createTour = createOne(Tour)
export const updateTour = updateOne(Tour)
export const deleteTour = deleteOne(Tour)

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

// /tours-within/300/center/11.109715,106.884309/unit/mi
export const getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1

  if (!lat || !lng) {
    throw new ApiError(
      400,
      'Please provide latitude and longitude in the format lat,lng.'
    )
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

// /distances/11.109715,106.884309/unit/mi
export const getTourDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')

  if (!lat || !lng) {
    throw new ApiError(
      400,
      'Please provide latitude and longitude in the format lat,lng.'
    )
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: unit === 'mi' ? 0.000621371 : 0.001
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ])

  res.status(200).json({
    status: 'success',
    data: {
      distances
    }
  })
})
