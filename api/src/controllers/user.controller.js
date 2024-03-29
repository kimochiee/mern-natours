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

// const filterObj = (obj, ...allowedFields) => {
//   return Object.keys(obj).reduce((acc, key) => {
//     if (allowedFields.includes(key)) {
//       acc[key] = obj[key]
//     }

//     return acc
//   }, {})
// }

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
