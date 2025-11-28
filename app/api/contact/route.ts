import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Save to Database
    const contact = await Contact.create(body);

    // Send Email
    const adminEmail = process.env.ADMIN_EMAIL || 'services@asija.in';

    const emailContent = {
      ...mailOptions,
      to: adminEmail,
      subject: `New Contact Request: ${body.topic} - ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #009edb;">New Contact Request</h2>
          <p><strong>Topic:</strong> ${body.topic}</p>
          <hr />
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
          <p><strong>Job Title:</strong> ${body.jobTitle || 'N/A'}</p>
          <p><strong>Location:</strong> ${body.location || 'N/A'}</p>
          <p><strong>Zipcode:</strong> ${body.zipcode || 'N/A'}</p>
          <hr />
          <h3>Message</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${body.message}</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(emailContent);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We still return success if DB save worked, but maybe log this
    }

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
