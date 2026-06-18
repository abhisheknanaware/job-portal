import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import React from 'react'; // <--- We must import React to use createElement!
import { ApplicationSuccessEmail } from '../emails/ApplicationSuccessEmail.js';
import { ApplicationUpdateEmail } from '../emails/ApplicationUpdateEmail.js';

// 1. Configure the transporter (Use your credentials here)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 2. Create the email sending function
export const sendApplicationSuccessEmail = async (toEmail, applicantName, jobTitle, companyName) => {
    try {
        // Render the React component into an HTML string using createElement
        const emailHtml = await render(
            React.createElement(ApplicationSuccessEmail, {
                applicantName: applicantName,
                jobTitle: jobTitle,
                companyName: companyName
            })
        );

        // Send the email
        const info = await transporter.sendMail({
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `Application Received: ${jobTitle}`,
            html: emailHtml,
        });

        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export const sendStatusUpdateEmail = async (toEmail, applicantName, jobTitle, companyName, newStatus) => {
    try {
        const emailHtml = await render(
            React.createElement(ApplicationUpdateEmail, {
                applicantName: applicantName,
                jobTitle: jobTitle,
                companyName: companyName,
                newStatus: newStatus
            })
        );
        const info = await transporter.sendMail({
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `Application Update: ${jobTitle}`,
            html: emailHtml,
        });
        console.log('Update Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending update email:', error);
        return false;
    }
};