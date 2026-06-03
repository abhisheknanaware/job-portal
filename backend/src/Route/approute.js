import { Router } from "express";
import * as Appcontroller from '../controller/appcontroller.js'
const appRouter = Router();
appRouter.get('/',Appcontroller.check);

export default appRouter;