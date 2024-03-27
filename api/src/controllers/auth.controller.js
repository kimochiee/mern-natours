import { sign } from 'jsonwebtoken'
import { env } from '~/config/env'
import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import Email from '~/utils/Email'
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
    throw new ApiError(400, 'Please provide email and password')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password))) {
    throw new ApiError(400, 'Incorrect email or password')
  }

  const token = signToken(user._id)

  res.status(200).json({ status: 'success', token })
})

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const user = await User.findOne({
    email
  })

  if (!user) {
    throw new ApiError(404, 'There is no user with that email address')
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  await new Email().sendPasswordReset(
    user.name,
    email,
    resetToken,
    req.headers.origin
  )

  res.status(200).json({ status: 'success', resetToken })
})

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  if (!user) {
    throw new ApiError(400, 'Token is invalid or has expired')
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  const token = signToken(user._id)

  res.status(200).json({ status: 'success', token })
})
