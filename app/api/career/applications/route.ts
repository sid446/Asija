import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { v2 as cloudinary } from 'cloudinary';

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
    const position = formData.get('position') as string;
    const department = formData.get('department') as string;
    const experience = formData.get('experience') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resume = formData.get('resume') as File;

    // Basic validation
    if (!fullName || !email || !phone || !position || !resume) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
      position,
      department: department || 'Not specified',
      experience: experience || 'Not specified',
      coverLetter: coverLetter || '',
      resume: resumeUrl || resumeFilename, // Use Cloudinary URL if available, fallback to filename
      jobId: null, // General application, not tied to specific job
      status: 'pending'
    };

    const application = await JobApplication.create(applicationData);

    // Send Email to Admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    try {
      console.log(`Attempting to send email to: ${adminEmail}`);
      await transporter.sendMail({
        ...mailOptions,
        to: adminEmail,
        subject: `New General Job Application: ${position} - ${fullName}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="background-color: #009edb; color: #ffffff; padding: 25px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New General Job Application</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Position: ${position}</p>
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
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Phone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Position Applied For</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${position}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Department</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${department || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Experience</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${experience || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Resume</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                      ${resumeUrl ?
                        `<a href="${resumeUrl}" target="_blank" style="color: #009edb; text-decoration: none; font-weight: 500;">View Resume</a>` :
                        resumeFilename
                      }
                    </td>
                  </tr>
                </table>

                ${coverLetter ? `
                  <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Cover Letter</h3>
                  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #009edb;">
                    <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${coverLetter}</p>
                  </div>
                ` : ''}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    This application was submitted via the general application form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        `,
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the application submission if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application._id
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}