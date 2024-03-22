import express from 'express'
const app = express()

import { env } from './config/env'
import router from './routes'
import { connectDB } from './config/mongodb'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1', router)

app.listen(env.PORT, async () => {
  await connectDB()

  /* eslint-disable-next-line no-console */
  console.log(`Server running on port ${env.PORT}`)
})
