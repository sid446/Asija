import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Alumni from '@/models/Alumni';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    if (!id || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const status = action === 'approve' ? 'Approved' : 'Rejected';
    
    const alumni = await Alumni.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!alumni) {
      return NextResponse.json({ message: 'Alumni not found' }, { status: 404 });
    }

    // Notify the alumni about the decision
    await transporter.sendMail({
      ...mailOptions,
      to: alumni.email,
      subject: `Alumni Registration ${status}`,
      html: `
        <p>Dear ${alumni.fullName},</p>
        <p>Your alumni registration request has been <strong>${status}</strong>.</p>
        ${status === 'Approved' ? '<p>Welcome to the community!</p>' : '<p>Please contact support for more details.</p>'}
      `,
    });

    return new NextResponse(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: ${action === 'approve' ? 'green' : 'red'}">
            Registration ${status}
          </h1>
          <p>The alumni has been notified.</p>
          <p>You can close this window.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Error processing action:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
