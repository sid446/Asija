import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import JobPost from '@/models/JobPost';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.fullName || !body.email || !body.phone || !body.experience) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, phone, experience' },
        { status: 400 }
      );
    }
    
    const application = await JobApplication.create(body);

    // Fetch job details for the email
    let jobTitle = 'Unknown Job';
    try {
      const job = await JobPost.findById(body.jobId);
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
        subject: `New Job Application: ${jobTitle} - ${body.fullName}`,
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
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Email</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;"><a href="mailto:${body.email}" style="color: #009edb; text-decoration: none;">${body.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Phone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Qualification</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.qualification}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Experience</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.experience}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.currentCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Expected CTC</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.expectedCTC || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Current Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.currentLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Preferred Location</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.preferredLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Age</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.age || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555; font-weight: 600;">Gender</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${body.gender || 'N/A'}</td>
                  </tr>
                </table>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px;">Resume</h2>
                <div style="margin-bottom: 30px;">
                  ${body.resumeLink ? 
                    `<a href="${body.resumeLink}" style="display: inline-block; padding: 12px 24px; background-color: #009edb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">View Resume</a>` 
                    : '<p style="color: #666; font-style: italic;">No resume link provided.</p>'}
                </div>

                <h2 style="color: #333; font-size: 18px; border-bottom: 2px solid #009edb; padding-bottom: 8px; margin-bottom: 20px;">Cover Letter</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #009edb; border-radius: 4px; color: #444; line-height: 1.6;">
                  ${body.coverLetter ? body.coverLetter.replace(/\n/g, '<br>') : '<span style="font-style: italic; color: #888;">No cover letter provided.</span>'}
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

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
