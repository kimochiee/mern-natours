import { Tour } from '~/models/tour.model'
import { ApiFeatures } from '~/utils/ApiFeatures'

export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

export const getAllTours = async (req, res) => {
  try {
    const features = new ApiFeatures(Tour.find(), req.query)

    const tours = await features.filter().sort().limitFields().paginate().query

    res
      .status(200)
      .json({ status: 'success', results: tours.length, data: { tours } })
  } catch (error) {
    console.log(error)

    res.status(400).json({ status: 'fail', message: error.message })
  }
}

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({ status: 'success', data: { tour } })
  } catch (error) {
    console.log(error)

    res.status(400).json({ status: 'fail', message: error.message })
  }
}

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)

    res.status(201).json({ status: 'success', data: { tour } })
  } catch (error) {
    console.log(error)

    res.status(400).json({ status: 'fail', message: error.message })
  }
}

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ status: 'success', data: { tour } })
  } catch (error) {
    console.log(error)

    res.status(400).json({ status: 'fail', message: error.message })
  }
}

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)

    res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    console.log(error)

    res.status(400).json({ status: 'fail', message: error.message })
  }
}
