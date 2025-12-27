import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Insight from '@/models/Insight';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await connectToDatabase();
      const insights = await Insight.find({ published: true }).sort({ createdAt: -1 });
      return NextResponse.json(insights);
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
