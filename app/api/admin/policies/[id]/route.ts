import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Policy from '@/models/Policy';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await req.json();
    const policy = await Policy.findByIdAndUpdate(id, body, { new: true });
    if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    return NextResponse.json(policy);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { id } = params;
    const policy = await Policy.findByIdAndDelete(id);
    if (!policy) return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    return NextResponse.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 });
  }
}
