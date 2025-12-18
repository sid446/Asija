import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: pass?.replace(/\s+/g, ''),
  },
});

export const mailOptions = {
  from: email || 'service@asija.in',
};
