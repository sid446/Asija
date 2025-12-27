import { NextResponse } from 'next/server';
import AboutCard from '@/models/AboutCard';
import dbConnect from '@/lib/mongodb';export async function GET() {
  try {
    await dbConnect();
    const cards = await AboutCard.find().sort({ order: 1 });

    return NextResponse.json({ items: cards });
  } catch (error) {
    console.error('Error fetching about cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
