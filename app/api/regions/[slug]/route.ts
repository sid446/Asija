import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalRegion from '@/models/GlobalRegion';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const slug = (await params).slug;
  
  try {
    const region = await GlobalRegion.findOne({ slug });
    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch region' }, { status: 500 });
  }
}
