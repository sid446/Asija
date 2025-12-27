import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Insight from '@/models/Insight';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await connectToDatabase();
      const insights = await Insight.find({ published: true }).sort({ createdAt: -1 });
      // Ensure we always return an array
      const insightsArray = Array.isArray(insights) ? insights : [];
      return NextResponse.json(insightsArray);
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    // Return empty array on error to prevent frontend crashes
    return NextResponse.json([]);
  }
}
