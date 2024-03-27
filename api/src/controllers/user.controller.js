import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

// const filterObj = (obj, ...allowedFields) => {
//   return Object.keys(obj).reduce((acc, key) => {
//     if (allowedFields.includes(key)) {
//       acc[key] = obj[key]
//     }

//     return acc
//   }, {})
// }

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

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    throw new ApiError(400, 'This route is not for password updates')
  }

  // const filteredBody = filterObj(req.body, 'name', 'email')

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  )

  res.status(200).json({ status: 'success', data: { user } })
})

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({ status: 'success', data: null })
})
