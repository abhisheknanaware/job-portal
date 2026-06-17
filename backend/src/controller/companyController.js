import Company from "../model/Company.js"
import User from "../model/User.js";
import bcrypt, { compare } from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generatetoken.js";
import Job from "../model/job.js";
import JobApplication from "../model/jobapplications.js";
import { sendStatusUpdateEmail } from '../utils/sendEmail.js';
//register
export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.json({ success: false, message: "Email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            img: imageUpload.secure_url
        })

        res.json({
            success: true, company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                img: company.img
            }, token: generateToken(company._id)
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({ success: false, message: "Company does not exist" });
        }

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    img: company.img
                }, token: generateToken(company._id)
            })
        } else {
            res.json({ success: false, message: 'Invalid email or password' })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//get companyy data
export const gatDataCompany = async (req, res) => {
    try {
        const company = req.company;
        res.json({ success: true, company })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}
//postJob
export const postjobs = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id;

    try {
        const newjob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newjob.save();

        res.json({ success: true, newJob: newjob, message: "Job Posted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id;
        //find job applications for the user and populate related data

        const applications = await JobApplication.find({ companyId }).
            populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec();

        return res.json({ success: true, applications })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get company posted jobs
export const getcompanyPostedjobs = async (req, res) => {
    try {
        const companyId = req.company._id;
        const jobs = await Job.find({ companyId });
        //no.of applicants

        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }));

        res.json({ success: true, jobsData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//change job application status
export const changeJobStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        const updatedApplication = await JobApplication.findByIdAndUpdate(id, { status });

        if (updatedApplication) {
            const userData = await User.findById(updatedApplication.userId).exec();
            const jobData = await Job.findById(updatedApplication.jobId).exec();

            if (userData && jobData) {
                const companyData = await Company.findById(jobData.companyId).exec();

                if (companyData) {
                    await sendStatusUpdateEmail(
                        userData.email,
                        userData.name,
                        jobData.title,
                        companyData.name,
                        status
                    );
                }
            }
        }

        res.json({ success: true, message: 'Status changed' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//change job visibility
export const changeVisibility = async (req, res) => {
    try {
        const { id } = req.body;
        const companyId = req.company._id;

        const job = await Job.findById(id);
        if (!job) {
            return res.json({ success: false, message: "Job not found" });
        }

        if (companyId.toString() !== job.companyId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        job.visible = !job.visible;
        await job.save();
        res.json({ success: true, job })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

