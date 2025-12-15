import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalRegion from '@/models/GlobalRegion';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    const region = await GlobalRegion.findByIdAndUpdate(id, body, { new: true });
    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    return NextResponse.json(region);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update region' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const region = await GlobalRegion.findByIdAndDelete(id);
    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Region deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete region' }, { status: 500 });
  }
}
