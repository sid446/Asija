import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobPost from '@/models/JobPost';
import mongoose from 'mongoose';

const SAMPLE_JOBS = [
  {
    title: 'Statutory Audit Senior',
    department: 'Audit & Assurance',
    location: 'New Delhi',
    type: 'Full-time',
    description: 'We are looking for an experienced Audit Senior to lead statutory audit engagements for our diverse client base. The role involves planning, execution, and finalization of audits.',
    requirements: [
      'Qualified Chartered Accountant (CA)',
      '1-3 years of post-qualification experience in Statutory Audit',
      'Strong knowledge of Ind AS and Companies Act',
      'Excellent communication and team management skills'
    ]
  },
  {
    title: 'Articled Assistant',
    department: 'General Practice',
    location: 'New Delhi',
    type: 'Internship',
    description: 'Opportunity for aspiring CAs to gain hands-on experience in Audit, Taxation (Direct & Indirect), and Corporate Law compliances under expert guidance.',
    requirements: [
      'CA Intermediate (Both Groups or Single Group cleared)',
      'Good academic record',
      'Basic knowledge of MS Office (Excel, Word)',
      'Eagerness to learn and adapt'
    ]
  }
];

export async function GET() {
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

    let jobs = await JobPostModel.find({ isActive: true }).sort({ createdAt: -1 });

    // Seed if empty
    if (jobs.length === 0) {
      jobs = await JobPost.insertMany(SAMPLE_JOBS);
    }

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Database Error:', error);
    // Fallback to sample data if DB fails, so the UI still works
    return NextResponse.json({ 
      success: true, 
      data: SAMPLE_JOBS.map(job => ({ ...job, _id: 'fallback-' + Math.random() })),
      isFallback: true 
    });
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const job = await JobPostModel.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
