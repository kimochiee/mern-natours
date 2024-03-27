import { sign, verify } from 'jsonwebtoken'
import { env } from '~/config/env'
import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

const signToken = (id) => {
  return sign({ id }, env.jwt.SECRET, {
    expiresIn: env.jwt.EXPIRES_IN
  })
}

export const signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  const token = signToken(user._id)

  res.status(201).json({ status: 'success', token, data: { user } })
})

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ApiError(400, 'Please provide email and password'))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password))) {
    return next(new ApiError(400, 'Incorrect email or password'))
  }

  const token = signToken(user._id)

  res.status(200).json({ status: 'success', token })
})

export const protect = catchAsync(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    throw new ApiError(401, 'You are not logged in')
  }

  const decoded = verify(token, env.jwt.SECRET)

  const user = await User.findById(decoded.id)

  if (!user) {
    throw new ApiError(
      401,
      'The user belonging to this token does no longer exist'
    )
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    throw new ApiError(
      401,
      'User recently changed password! Please log in again'
    )
  }

  req.user = user
  next()
})
