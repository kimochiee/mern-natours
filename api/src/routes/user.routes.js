import { Router } from 'express'
import { signIn, signUp } from '~/controllers/auth.controller'
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '~/controllers/user.controller'

const router = Router()

// Auth routes
router.route('/signup').post(signUp)
router.route('/signin').post(signIn)

// User routes
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
