import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobPost from '@/models/JobPost';
import mongoose from 'mongoose';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

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

    const { id } = await params;
    const body = await request.json();

    const job = await JobPostModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

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

    const { id } = await params;

    const job = await JobPostModel.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
