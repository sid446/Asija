import { NextResponse } from 'next/server';
import AboutTimeline from '@/models/AboutTimeline';
import dbConnect from '@/lib/mongodb';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const item = await AboutTimeline.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating timeline item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await AboutTimeline.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
