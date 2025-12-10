import { Router } from 'express'
import lectureController from '../controllers/lectureController.js';
const lectureRouter = Router();

lectureRouter.post("/add",lectureController.addLecture)
lectureRouter.get("/get",lectureController.getLecture)
lectureRouter.get("/:id",lectureController.getLecture)

export default lectureRouter;