import { Router } from 'express'
import userController from '../controllers/userController.js';
const userRouter = Router();

userRouter.post('/add', userController.addUser)
userRouter.get('/get', userController.getAllInstructor)
userRouter.post('/login', userController.login)

export default userRouter;