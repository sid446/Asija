import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Insight from '@/models/Insight';


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const data = await request.json();

    // Generate new slug if title changed
    const slug = data.title
      ? data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : undefined;

    const insight = await Insight.findByIdAndUpdate(
      id,
      { ...data, ...(slug && { slug }) },
      { new: true }
    );

    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json(insight);
  } catch (error) {
    console.error('Error updating insight:', error);
    return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Deleting insight with ID:', id);
    await connectToDatabase();
    const insight = await Insight.findByIdAndDelete(id);
    console.log('Deleted insight:', insight);

    if (!insight) {
      console.log('Insight not found');
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Insight deleted successfully' });
  } catch (error) {
    console.error('Error deleting insight:', error);
    return NextResponse.json({ error: 'Failed to delete insight' }, { status: 500 });
  }
}