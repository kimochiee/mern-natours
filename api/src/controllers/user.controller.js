import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
} from './factory.handler'
import { cloudinary } from '~/utils/cloudinary'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { Booking } from '~/models/booking.model'
import { Review } from '~/models/review.model'

const filterObj = (obj, ...allowedFields) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (allowedFields.includes(key)) {
      acc[key] = obj[key]
    }

    return acc
  }, {})
}

const writeFile = util.promisify(fs.writeFile)

export const getAllUsers = getAll(User)
export const getUser = getOne(User)
export const createUser = createOne(User)
export const updateUser = updateOne(User)
export const deleteUser = deleteOne(User)

export const getMe = (req, res, next) => {
  req.params.id = req.user.id

  next()
}

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    throw new ApiError(400, 'This route is not for password updates')
  }

  const filteredBody = filterObj(req.body, 'name', 'email')

  if (req.file) {
    const tempFilePath = path.join(__dirname, req.file.originalname)
    await writeFile(tempFilePath, req.file.buffer)

    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'file-upload'
    })

    fs.unlinkSync(tempFilePath)
    filteredBody.photo = result.secure_url
    filteredBody.photo_publicId = result.public_id
  }

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ status: 'success', data: { user } })
})

export const deactivateMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false })

  res.status(200).json({ status: 'success', data: null })
})

export const deleteMe = catchAsync(async (req, res, next) => {
  if (req.user.photo_publicId != '') {
    await Promise.all([
      User.findByIdAndDelete(req.user._id),
      cloudinary.uploader.destroy(req.user.photo_publicId),
      Booking.deleteMany({ user: req.user._id }),
      Review.deleteMany({ user: req.user._id })
    ])
  } else {
    await Promise.all([
      User.findByIdAndDelete(req.user._id),
      Booking.deleteMany({ user: req.user._id }),
      Review.deleteMany({ user: req.user._id })
    ])
  }

  res.status(200).json({ status: 'success', data: null })
})
