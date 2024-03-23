import express from 'express'
const app = express()

import { env } from './config/env'
import router from './routes'
import { connectDB } from './config/mongodb'
import { errorMiddleware } from './middlewares/error.middleware'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1', router)
app.use(errorMiddleware)

app.listen(env.PORT, async () => {
  await connectDB()

  console.log(`Server running on port ${env.PORT}`)
})
