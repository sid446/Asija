import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Alumni from '@/models/Alumni';
import Otp from '@/models/Otp';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { 
      fullName, email, phone, yearOfLeaving, designationAtAsija, 
      currentProfessionalQualification, currentDesignation, linkedinProfile, otp 
    } = body;

    // Verify OTP again to ensure security before submission
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
       return NextResponse.json({ message: 'Invalid or expired OTP. Please verify again.' }, { status: 400 });
    }

    // Check if already registered
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return NextResponse.json({ message: 'Alumni with this email already exists' }, { status: 400 });
    }

    // Create Alumni
    const newAlumni = await Alumni.create({
      fullName,
      email,
      phone,
      yearOfLeaving,
      designationAtAsija,
      currentProfessionalQualification,
      currentDesignation,
      linkedinProfile,
      status: 'Pending'
    });

    // Delete used OTP
    await Otp.deleteOne({ email });

    // Send Email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const approveLink = `${baseUrl}/api/alumni/action?id=${newAlumni._id}&action=approve`;
    const rejectLink = `${baseUrl}/api/alumni/action?id=${newAlumni._id}&action=reject`;

    await transporter.sendMail({
      ...mailOptions,
      to: adminEmail,
      subject: 'New Alumni Registration Request',
      html: `
        <h2>New Alumni Registration</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Year of Leaving Asija:</strong> ${yearOfLeaving}</p>
        <p><strong>Designation at Asija:</strong> ${designationAtAsija}</p>
        <p><strong>Current Professional Qualification:</strong> ${currentProfessionalQualification}</p>
        <p><strong>Current Designation:</strong> ${currentDesignation}</p>
        <p><strong>LinkedIn:</strong> ${linkedinProfile || 'N/A'}</p>
        <br/>
        <p>Please take action:</p>
        <a href="${approveLink}" style="padding: 10px 20px; background-color: green; color: white; text-decoration: none; margin-right: 10px;">Approve</a>
        <a href="${rejectLink}" style="padding: 10px 20px; background-color: red; color: white; text-decoration: none;">Reject</a>
      `,
    });

    return NextResponse.json({ message: 'Registration submitted successfully. Pending approval.' });
  } catch (error) {
    console.error('Error submitting alumni form:', error);
    return NextResponse.json({ message: 'Failed to submit registration' }, { status: 500 });
  }
}
