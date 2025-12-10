import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AboutCard from '@/models/AboutCard';

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
    const card = await AboutCard.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error updating about card:', error);
    return NextResponse.json({ error: 'Failed to update card' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await AboutCard.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting about card:', error);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}
