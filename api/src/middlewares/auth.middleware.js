import { verify } from 'jsonwebtoken'
import { env } from '~/config/env'
import { User } from '~/models/user.model'
import { ApiError } from '~/utils/ApiError'
import { catchAsync } from '~/utils/catchAsync'

export const protect = catchAsync(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else {
    token = req.cookies.jwt
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

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        'You do not have permission to perform this action'
      )
    }

    next()
  }
}
