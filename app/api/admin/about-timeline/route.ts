import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AboutTimeline from '@/models/AboutTimeline';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    const items = await AboutTimeline.find().sort({ order: 1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const item = await AboutTimeline.create(data);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating timeline item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
