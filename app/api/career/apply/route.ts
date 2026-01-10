import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import JobPost from '@/models/JobPost';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();

    // Extract form data
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const qualification = formData.get('qualification') as string;
    const experience = formData.get('experience') as string;
    const currentLocation = formData.get('currentLocation') as string;
    const preferredLocation = formData.get('preferredLocation') as string;
    const age = formData.get('age') as string;
    const gender = formData.get('gender') as string;
    const currentCTC = formData.get('currentCTC') as string;
    const expectedCTC = formData.get('expectedCTC') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resume = formData.get('resume') as File;
    const jobId = formData.get('jobId') as string;

    // Basic validation
    if (!fullName || !email || !phone || !experience || !resume) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, phone, experience, resume' },
        { status: 400 }
      );
    }

    // Handle file upload to Cloudinary
    let resumeUrl = '';
    if (resume) {
      try {
        // Convert file to buffer for Cloudinary upload
        const arrayBuffer = await resume.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload directly to Cloudinary using upload method for better access control
        const uploadResult = await cloudinary.uploader.upload(
          `data:${resume.type};base64,${buffer.toString('base64')}`,
          {
            folder: 'asija-resumes',
            resource_type: 'raw', // Use raw for PDFs instead of auto
            public_id: `resume-${Date.now()}-${fullName.replace(/\s+/g, '-').toLowerCase()}`,
            access_mode: 'public',
            type: 'upload',
            use_filename: false,
            unique_filename: false,
            access_control: [{ access_type: 'anonymous' }],
          }
        );

        // Extract the secure URL from the result
        const result = uploadResult as any;
        resumeUrl = result.secure_url || result.url;

        console.log('Resume uploaded to:', resumeUrl);
      } catch (uploadError) {
        console.error('Error uploading resume:', uploadError);
        // Continue with application submission but log the error
      }
    }

    const applicationData = {
      fullName,
      email,
      phone,
      qualification: qualification || '',
      experience,
      currentLocation: currentLocation || '',
      preferredLocation: preferredLocation || '',
      age: age || '',
      gender: gender || '',
      currentCTC: currentCTC || '',
      expectedCTC: expectedCTC || '',
      coverLetter: coverLetter || '',
      resume: resumeUrl, // Store Cloudinary URL
      jobId: jobId || null,
      status: 'pending'
    };

    const application = await JobApplication.create(applicationData);

    // Fetch job details for the email
    let jobTitle = 'Unknown Job';
    try {
      // Ensure JobPost model is available
      const JobPostModel = mongoose.models.JobPost || mongoose.model('JobPost', new mongoose.Schema({
        title: String,
        department: String,
        location: String,
        type: String,
        description: String,
        requirements: [String],
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now }
      }));

      const job = await JobPostModel.findById(jobId);
      if (job) jobTitle = job.title;
    } catch (err) {
      console.error('Error fetching job details for email:', err);
    }

    // Send Email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    
    try {
      console.log(`Attempting to send email to: ${adminEmail}`);
      await transporter.sendMail({
        ...mailOptions,
        to: adminEmail, // Send to Admin
        subject: `New Job Application: ${jobTitle} - ${fullName}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="background-color: #009edb; color: #ffffff; padding: 25px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Job Application</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">${jobTitle}</p>
              </div>
              
              <div style="padding: 30px;">
                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px; margin-top: 0;">Applicant Details</h2>
                
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
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Qualification</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${qualification}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Experience</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${experience}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Expected CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${expectedCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Preferred Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${preferredLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Age</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${age || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Gender</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${gender || 'N/A'}</td>
                  </tr>
                </table>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px;">Resume</h2>
                <div style="margin-bottom: 30px;">
                  ${resumeUrl ?
                    `<a href="${resumeUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #009edb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">View Resume</a>`
                    : '<p style="color: #666; font-style: italic;">No resume attached.</p>'}
                </div>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px;">Cover Letter</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #009edb; border-radius: 4px; color: #444; line-height: 1.6;">
                  ${coverLetter ? coverLetter.replace(/\n/g, '<br>') : '<span style="font-style: italic; color: #888;">No cover letter provided.</span>'}
                </div>
              </div>
              
              <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                &copy; ${new Date().getFullYear()} Asija & Associates LLP. All rights reserved.
              </div>
            </div>
          </div>
        `,
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't fail the request if email fails, but we log it.
    }

    // Send Confirmation Email to Applicant
    try {
      console.log(`Attempting to send confirmation email to: ${email}`);
      await transporter.sendMail({
        ...mailOptions,
        to: email, // Send to Applicant
        subject: `Application Submitted Successfully for ${jobTitle}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="background-color: #28a745; color: #ffffff; padding: 25px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Application Submitted Successfully</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">${jobTitle}</p>
              </div>
              
              <div style="padding: 30px;">
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Dear ${fullName},</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Thank you for applying for the position of <strong>${jobTitle}</strong>. Your application has been submitted successfully. Below is a summary of the information you provided:</p>
                
                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #28a745; padding-bottom: 8px; margin-bottom: 20px; margin-top: 0;">Your Application Details</h2>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600; width: 40%;">Full Name</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Email</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Phone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Qualification</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${qualification}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Experience</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${experience}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Expected CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${expectedCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${currentLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Preferred Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${preferredLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Age</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${age || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Gender</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${gender || 'N/A'}</td>
                  </tr>
                </table>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #28a745; padding-bottom: 8px; margin-bottom: 20px;">Resume</h2>
                <div style="margin-bottom: 30px;">
                  ${resumeUrl ?
                    `<a href="${resumeUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">View Your Resume</a>`
                    : '<p style="color: #666; font-style: italic;">No resume attached.</p>'}
                </div>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #28a745; padding-bottom: 8px; margin-bottom: 20px;">Cover Letter</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; border-radius: 4px; color: #444; line-height: 1.6;">
                  ${coverLetter ? coverLetter.replace(/\n/g, '<br>') : '<span style="font-style: italic; color: #888;">No cover letter provided.</span>'}
                </div>

                <p style="font-size: 16px; color: #333; margin-top: 30px;">We will review your application and get back to you soon. If you have any questions, please contact us.</p>
                <p style="font-size: 16px; color: #333;">Best regards,<br>Asija & Associates LLP Team</p>
              </div>
              
              <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                &copy; ${new Date().getFullYear()} Asija & Associates LLP. All rights reserved.
              </div>
            </div>
          </div>
        `,
      });
      console.log('Confirmation email sent successfully to applicant');
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // We don't fail the request if email fails, but we log it.
    }

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
