import { NextResponse } from 'next/server';
import Gallery from '@/models/Gallery';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    const galleries = await Gallery.find().sort({ date: -1 });
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const gallery = await Gallery.create(body);
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery event' }, { status: 500 });
  }
}
