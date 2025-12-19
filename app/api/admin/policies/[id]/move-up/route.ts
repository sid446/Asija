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

    // Find the policy immediately above (lower order number)
    const abovePolicy = await Policy.findOne({
      order: { $lt: currentPolicy.order }
    }).sort({ order: -1 });

    if (!abovePolicy) {
      return NextResponse.json({ error: 'Policy is already at the top' }, { status: 400 });
    }

    // Swap the order values
    const tempOrder = currentPolicy.order;
    currentPolicy.order = abovePolicy.order;
    abovePolicy.order = tempOrder;

    // Save both policies
    await currentPolicy.save();
    await abovePolicy.save();

    return NextResponse.json({ message: 'Policy moved up successfully' });
  } catch (error) {
    console.error('Error moving policy up:', error);
    return NextResponse.json({ error: 'Failed to move policy up' }, { status: 500 });
  }
}