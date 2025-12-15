import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Gallery from '@/models/Gallery';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const gallery = await Gallery.findByIdAndUpdate(id, body, { new: true });
    
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery event not found' }, { status: 404 });
    }
    
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery event' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const gallery = await Gallery.findByIdAndDelete(id);
    
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Gallery event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery event' }, { status: 500 });
  }
}
