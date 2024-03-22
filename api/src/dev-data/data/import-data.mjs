/* eslint-disable no-console */
import fs from 'fs'
import mongoose from 'mongoose'
import Env from '../../config/env.js'
import TourModel from '../../models/tour.model.js'

mongoose
  .connect(Env.env.MONGO_URI)
  .then(console.log('DB connection successful!'))
  .catch((err) => console.log(err))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

const importData = async () => {
  try {
    await TourModel.Tour.create(tours)
    console.log('Data successfully loaded!')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await TourModel.Tour.deleteMany()
    console.log('Data successfully deleted!')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  // node ./src/dev-data/data/import-data.js --import
  importData()
} else if (process.argv[2] === '--delete') {
  // node ./src/dev-data/data/import-data.js --delete
  deleteData()
}
