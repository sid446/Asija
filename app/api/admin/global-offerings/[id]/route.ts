import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalOffering from '@/models/GlobalOffering';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    const offering = await GlobalOffering.findByIdAndUpdate(id, body, { new: true });
    if (!offering) {
      return NextResponse.json({ error: 'Offering not found' }, { status: 404 });
    }
    return NextResponse.json(offering);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update offering' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const offering = await GlobalOffering.findByIdAndDelete(id);
    if (!offering) {
      return NextResponse.json({ error: 'Offering not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Offering deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete offering' }, { status: 500 });
  }
}
