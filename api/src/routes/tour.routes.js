import { Router } from 'express'
const router = Router()

import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} from '~/controllers/tour.controller'

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

export default router
