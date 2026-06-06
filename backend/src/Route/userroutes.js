import { Router } from "express";
import * as Usercontroller from '../controller/usercontroller.js'
import upload from "../config/multer.js";
const UserRouter = Router();

UserRouter.get('/user',Usercontroller.getUserData);
UserRouter.post('/apply',Usercontroller.applyforJob);
UserRouter.get('/applications',Usercontroller.getuserJobApplications);
UserRouter.post('/update-resume',upload.single('resume'),Usercontroller.updateUserResume);

export default UserRouter;