import { User } from '~/models/user.model'
import { catchAsync } from '~/utils/catchAsync'

export const signUp = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({ status: 'success', data: { user } })
})
