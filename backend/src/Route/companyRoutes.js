import { Router } from "express";
import * as companycontroller from '../controller/companyController.js'
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";
const CompanyRouter = Router();

CompanyRouter.post('/register',upload.single('image'), companycontroller.registerCompany);
CompanyRouter.post('/login',companycontroller.loginCompany);
CompanyRouter.get('/companyData',protectCompany,companycontroller.gatDataCompany);
CompanyRouter.post('/post-job',protectCompany,companycontroller.postjobs);
CompanyRouter.get('/applicants',protectCompany,companycontroller.getCompanyJobApplicants);
CompanyRouter.get('/list-jobs',protectCompany,companycontroller.getcompanyPostedjobs);
CompanyRouter.post('/change-status',protectCompany,companycontroller.changeJobStatus);
CompanyRouter.post('/change-visibility',protectCompany,companycontroller.changeVisibility);

export default CompanyRouter;


