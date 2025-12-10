import { Router } from 'express'
import courseController from '../controllers/courseController.js';
const courseRouter = Router();

courseRouter.post('/add',courseController.addCourse)
courseRouter.get('/get',courseController.getCourse)

export default courseRouter