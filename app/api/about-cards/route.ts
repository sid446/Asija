import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AboutCard from '@/models/AboutCard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    const cards = await AboutCard.find().sort({ order: 1 });

    return NextResponse.json({ items: cards });
  } catch (error) {
    console.error('Error fetching about cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}