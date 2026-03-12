// Version endpoint for cache busting
export async function GET_VERSION() {
  try {
    // Get the latest updated insight
    const latest = await Insight.findOne({}).sort({ updatedAt: -1 }).select('updatedAt');
    const version = latest ? latest.updatedAt.toISOString() : new Date().toISOString();
    return NextResponse.json({ version });
  } catch (error) {
    return NextResponse.json({ version: new Date().toISOString() });
  }
}
import { NextResponse } from 'next/server';
import { dbGet, dbMutate } from '@/lib/database';
import Insight from '@/models/Insight';

export async function GET() {
  try {
    const insights = await dbGet(async () => {
      return await Insight.find({}).sort({ createdAt: -1 });
    });

    console.log('Fetched insights:', insights.length, 'items');
    console.log('Insight IDs:', insights.map(i => i._id));
    return NextResponse.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Creating insight with data:', data);

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Accept image and video URLs
    const insight = await dbMutate(async () => {
      return await Insight.create({
        ...data,
        slug,
        image: data.image || '',
        video: data.video || '',
      });
    });

    console.log('Created insight:', (insight as any)._id);
    return NextResponse.json(insight);
  } catch (error) {
    console.error('Error creating insight:', error);
    return NextResponse.json({ error: 'Failed to create insight' }, { status: 500 });
  }
}
