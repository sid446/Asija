import { NextResponse } from 'next/server';
import AboutTimeline from '@/models/AboutTimeline';
import dbConnect from '@/lib/mongodb';export async function GET() {
  try {
    await dbConnect();
    const items = await AboutTimeline.find().sort({ order: 1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const item = await AboutTimeline.create(data);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating timeline item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
