import { NextResponse } from 'next/server';
import { dbMutate } from '@/lib/database';
import Alumni from '@/models/Alumni';
import Otp from '@/models/Otp';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, yearOfLeaving, designationAtAsija,
      currentProfessionalQualification, currentDesignation, linkedinProfile, otp
    } = body;

    const result = await dbMutate(async () => {
      // Verify OTP again to ensure security before submission
      const otpRecord = await Otp.findOne({ email });
      if (!otpRecord || otpRecord.otp !== otp) {
         throw new Error('Invalid or expired OTP. Please verify again.');
      }

      // Check if already registered
      const existingAlumni = await Alumni.findOne({ email });
      if (existingAlumni) {
        throw new Error('Alumni with this email already exists');
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

      return newAlumni;
    });

    // Send Email to Admin (outside of database transaction since it's external)
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const approveLink = `${baseUrl}/api/alumni/action?id=${result._id}&action=approve`;
    const rejectLink = `${baseUrl}/api/alumni/action?id=${result._id}&action=reject`;

    await transporter.sendMail({
      ...mailOptions,
      to: adminEmail,
      subject: 'New Alumni Registration Request',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div style="background-color: #009edb; color: #ffffff; padding: 25px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Alumni Registration</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Action Required</p>
            </div>

            <div style="padding: 30px;">
              <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px; margin-top: 0;">Alumni Details</h2>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600; width: 40%;">Full Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;"><a href="mailto:${email}" style="color: #009edb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Year of Leaving</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${yearOfLeaving}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Designation at Asija</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${designationAtAsija}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current Qualification</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentProfessionalQualification}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current Designation</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentDesignation}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">LinkedIn</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${linkedinProfile ? `<a href="${linkedinProfile}" style="color: #009edb; text-decoration: none;">View Profile</a>` : 'N/A'}</td>
                </tr>
              </table>

              <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px;">Approval Action</h2>
              <div style="text-align: center; padding: 10px 0;">
                <a href="${approveLink}" style="display: inline-block; padding: 12px 30px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin-right: 15px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">Approve</a>
                <a href="${rejectLink}" style="display: inline-block; padding: 12px 30px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);">Reject</a>
              </div>
              <p style="text-align: center; color: #666; font-size: 13px; margin-top: 15px;">Clicking these buttons will directly process the request.</p>
            </div>

            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
              &copy; ${new Date().getFullYear()} Asija & Associates LLP. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Registration submitted successfully. Pending approval.' });
  } catch (error) {
    console.error('Error submitting alumni form:', error);
    if (error instanceof Error && error.message.includes('OTP') || error.message.includes('already exists')) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to submit registration' }, { status: 500 });
  }
}
