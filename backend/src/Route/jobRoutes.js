import { Router } from "express";
import * as JobController from '../controller/jobController.js'
const jobRouter = Router();

jobRouter.get('/', JobController.getJobs);
jobRouter.get('/:id', JobController.getjobbyId);

export default jobRouter;