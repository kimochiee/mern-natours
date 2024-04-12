import express from 'express'
const app = express()

import cors from 'cors'
import cookieParser from 'cookie-parser'

import { env } from './config/env'
import router from './routes'
import { connectDB } from './config/mongodb'
import { errorMiddleware } from './middlewares/error.middleware'
import { corsOptions } from './config/cors'

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1', router)
app.use(errorMiddleware)

const server = app.listen(env.PORT, async () => {
  await connectDB()

  console.log(`Server running on port ${env.PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err)

  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err)

  server.close(() => {
    process.exit(1)
  })
})
