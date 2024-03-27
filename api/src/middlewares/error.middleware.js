import { env } from '~/config/env'
import { ApiError } from '~/utils/ApiError'

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    console.error(err)

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    })
  }
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`

  return new ApiError(400, message)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value.`

  return new ApiError(400, message)
}

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (env.BUILD_MODE === 'dev') {
    sendErrorDev(err, res)
  } else {
    let error

    if (err.name === 'CastError') error = handleCastErrorDB(err)
    if (err.code === 11000) error = handleDuplicateFieldsDB(err)
    if (err.name === 'ValidationError') error = new ApiError(400, err.message)
    if (err.name === 'JsonWebTokenError')
      error = new ApiError(401, 'Invalid token. Please log in again')
    if (err.name === 'TokenExpiredError')
      error = new ApiError(401, 'Token expired. Please log in again')

    sendProdError(error, res)
  }
}