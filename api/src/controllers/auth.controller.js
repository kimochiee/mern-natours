import { sign } from 'jsonwebtoken'
import { env } from '~/config/env'
import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

export const signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  const token = sign({ id: user._id }, env.jwt.SECRET, {
    expiresIn: env.jwt.EXPIRES_IN
  })

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

  const token = sign({ id: user._id }, env.jwt.SECRET, {
    expiresIn: env.jwt.EXPIRES_IN
  })

  res.status(200).json({ status: 'success', token })
})
