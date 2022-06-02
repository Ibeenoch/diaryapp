import express from 'express'
import { createUser, getUser, loginUser } from '../controllers.js/user.js'
import protect from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.get('/me', protect, getUser)
userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

export default userRouter;