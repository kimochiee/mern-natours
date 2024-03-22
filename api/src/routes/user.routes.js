import { Router } from 'express'
const router = Router()

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '~/controllers/user.controller'

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
