import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';

export async function GET() {
  await dbConnect();

  try {
    const applications = await JobApplication.find({})
      .sort({ appliedAt: -1 })
      .populate('jobId', 'title department') // Populate job details if jobId exists
      .lean();

    return NextResponse.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
