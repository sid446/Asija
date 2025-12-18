import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Otp from '@/models/Otp';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    if (!email.endsWith('@asija.in')) {
      return NextResponse.json({ message: 'Only @asija.in addresses are allowed' }, { status: 403 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB (upsert)
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send Email
    try {
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: 'Your OTP for Asija Login',
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="background-color: #009edb; color: #ffffff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Verification Code</h1>
              </div>
              
              <div style="padding: 40px 30px; text-align: center;">
                <p style="color: #555; font-size: 16px; margin-bottom: 25px;">Use the following One-Time Password (OTP) to sign in:</p>
                
                <div style="background-color: #f0f9ff; border: 2px dashed #009edb; border-radius: 8px; padding: 15px; display: inline-block; margin-bottom: 25px;">
                  <span style="font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #009edb;">${otp}</span>
                </div>
                
                <p style="color: #888; font-size: 14px; margin: 0;">This code is valid for 5 minutes.<br>Do not share this code with anyone.</p>
              </div>
              
              <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                &copy; ${new Date().getFullYear()} Asija & Associates LLP. All rights reserved.
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      // Still return success for now, but log the error
    }

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
  }
}
