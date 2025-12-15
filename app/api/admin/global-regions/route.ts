import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalRegion from '@/models/GlobalRegion';

export async function GET() {
  await dbConnect();
  try {
    const regions = await GlobalRegion.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(regions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const region = await GlobalRegion.create(body);
    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 });
  }
}
