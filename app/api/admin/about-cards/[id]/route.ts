import { NextResponse } from 'next/server';
import AboutCard from '@/models/AboutCard';
import dbConnect from '@/lib/mongodb';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const card = await AboutCard.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error updating about card:', error);
    return NextResponse.json({ error: 'Failed to update card' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await AboutCard.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting about card:', error);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}
