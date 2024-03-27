import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({ status: 'success', data: { users } })
})

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ApiError(404, 'User not found'))
  }

  res.status(200).json({ status: 'success', data: { user } })
})

export const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({ status: 'success', data: { user } })
})

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!user) {
    return next(new ApiError(404, 'User not found'))
  }

  res.status(200).json({ status: 'success', data: { User } })
})

export const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(204).json({ status: 'success', data: null })
})
