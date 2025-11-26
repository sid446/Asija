import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,          // OR 587 (if you want STARTTLS)
  secure: true,       // true for port 465, false for 587
  auth: {
    user: email,
    pass,             // use your Yahoo app password
  },
});

export const mailOptions = {
  from: email,
};
