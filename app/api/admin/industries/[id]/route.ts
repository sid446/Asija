import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Industry from '@/models/Industry';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();

    const industry = await Industry.findByIdAndUpdate(id, body, { new: true });
    if (!industry) {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Industry updated', item: industry });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update industry' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const industry = await Industry.findByIdAndDelete(id);

    if (!industry) {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Industry deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete industry' }, { status: 500 });
  }
}
