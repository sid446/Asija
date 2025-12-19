import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Policy from '@/models/Policy';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;

    // Find the current policy
    const currentPolicy = await Policy.findById(id);
    if (!currentPolicy) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    }

    // Find the policy immediately below (higher order number)
    const belowPolicy = await Policy.findOne({
      order: { $gt: currentPolicy.order }
    }).sort({ order: 1 });

    if (!belowPolicy) {
      return NextResponse.json({ error: 'Policy is already at the bottom' }, { status: 400 });
    }

    // Swap the order values
    const tempOrder = currentPolicy.order;
    currentPolicy.order = belowPolicy.order;
    belowPolicy.order = tempOrder;

    // Save both policies
    await currentPolicy.save();
    await belowPolicy.save();

    return NextResponse.json({ message: 'Policy moved down successfully' });
  } catch (error) {
    console.error('Error moving policy down:', error);
    return NextResponse.json({ error: 'Failed to move policy down' }, { status: 500 });
  }
}