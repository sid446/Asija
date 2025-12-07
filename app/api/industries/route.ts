import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Industry from '@/models/Industry';

export async function GET() {
  try {
    await dbConnect();
    const industries = await Industry.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ industries });
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
  }
}
