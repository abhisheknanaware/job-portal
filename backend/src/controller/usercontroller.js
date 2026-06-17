import Job from "../model/job.js";
import JobApplication from "../model/jobapplications.js";
import Company from "../model/Company.js"
import User from "../model/User.js";
import { v2 as cloudinary } from "cloudinary";
import { clerkClient } from "@clerk/express";
import { sendApplicationSuccessEmail } from '../utils/sendEmail.js';


//get user data
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth();

        let user = await User.findById(userId);

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);

            user = await User.create({
                _id: userId,
                name: clerkUser.fullName || `${clerkUser.firstName} ${clerkUser.lastName}`,
                email: clerkUser.emailAddresses[0].emailAddress,
                image: clerkUser.imageUrl,
                resume: ""
            });
        }

        res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//apply for a job

export const applyforJob = async (req, res) => {
    const { jobId } = req.body;
    const { userId } = req.auth();

    try {
        const isAlreadyApply = await JobApplication.find({ jobId, userId });

        if (isAlreadyApply.length > 0) {
            return res.json({ success: false, message: 'Already Applied' });
        }
        const jobData = await Job.findById(jobId);

        if (!jobData) {
            return res.json({ success: false, message: 'Job not Found' });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        const userData = await User.findById(userId, { email: 1, name: 1 });
        const companyData = await Company.findById(jobData.companyId, { name: 1 });

        sendApplicationSuccessEmail(userData.email, userData.name, jobData.title, companyData.name);

        res.json({ success: true, message: "Applied Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// get user applied applications
export const getuserJobApplications = async (req, res) => {
    try {
        const { userId } = req.auth();
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email img')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found' });
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//update user profile
export const updateUserResume = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resumeFile = req.file;
        const userData = await User.findById(userId);

        if (resumeFile) {
            const resumeupload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeupload.secure_url;
        }

        await userData.save();

        res.json({ success: true, message: "Resume Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}