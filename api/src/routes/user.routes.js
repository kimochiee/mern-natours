import { Router } from 'express'
import {
  forgotPassword,
  logOut,
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
  deleteMe,
  getMe,
  deactivateMe
} from '~/controllers/user.controller'
import { protect, restrictTo } from '~/middlewares/auth.middleware'
import { upload } from '~/utils/cloudinary'

const router = Router()

// Auth routes
router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/logout').post(logOut)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword').patch(resetPassword)

router.use(protect)
router.route('/updateMyPassword').patch(updatePassword)

// Current user routes
router.route('/me').get(getMe, getUser)
router.route('/updateMe').patch(upload.single('photo'), updateMe)
router.route('/deactivateMe').patch(deactivateMe)
router.route('/deleteMe').delete(deleteMe)

// User routes
router.use(restrictTo('admin'))
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
