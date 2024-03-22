import { Router } from 'express'
const router = Router()

import userRouter from './user.routes'
import tourRouter from './tour.routes'

router.use('/users', userRouter)
router.use('/tours', tourRouter)

export default router
