import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Gallery from '@/models/Gallery';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    const galleries = await Gallery.find().sort({ date: -1 });
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const gallery = await Gallery.create(body);
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery event' }, { status: 500 });
  }
}
