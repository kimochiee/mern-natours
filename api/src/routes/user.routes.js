import { Router } from 'express'
import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp
} from '~/controllers/auth.controller'
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

router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword').post(resetPassword)

// User routes
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
