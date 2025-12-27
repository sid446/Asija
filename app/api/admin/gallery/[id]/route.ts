import { NextResponse } from 'next/server';
import Gallery from '@/models/Gallery';
import dbConnect from '@/lib/mongodb';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const gallery = await Gallery.findByIdAndUpdate(id, body, { new: true });
    
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery event not found' }, { status: 404 });
    }
    
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery event' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const gallery = await Gallery.findByIdAndDelete(id);
    
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Gallery event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery event' }, { status: 500 });
  }
}
