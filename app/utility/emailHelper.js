// All the email related utility functions are implemented here

import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER } from "../config/config.js";

// Create transporter
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURITY, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Verify connection configuration
transporter.verify().then(() => {
    console.log('Email server is ready to take messages');
}).catch((error) => {
    console.error('Error configuring email transporter:', error);
});

// Send email function
export const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: `IC Solution BD `,
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};





// 