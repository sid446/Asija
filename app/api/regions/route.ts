import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalRegion from '@/models/GlobalRegion';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await dbConnect();
      const regions = await GlobalRegion.find({}).sort({ order: 1 }).select('name slug');
      return NextResponse.json(regions);
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}
