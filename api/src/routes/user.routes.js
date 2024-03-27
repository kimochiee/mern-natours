import { Router } from 'express'
import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
  updatePassword
} from '~/controllers/auth.controller'
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} from '~/controllers/user.controller'
import { protect } from '~/middlewares/auth.middleware'

const router = Router()

// Auth routes
router.route('/signup').post(signUp)
router.route('/signin').post(signIn)

router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)

router.route('/updateMyPassword').patch(protect, updatePassword)

// User routes
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

// Current user routes
router.route('/updateMe').patch(protect, updateMe)
router.route('/deleteMe').delete(protect, deleteMe)

export default router
