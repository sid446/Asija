import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AboutTimeline from '@/models/AboutTimeline';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    const item = await AboutTimeline.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating timeline item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await AboutTimeline.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
