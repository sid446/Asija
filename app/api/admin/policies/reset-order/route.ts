import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Policy from '@/models/Policy';

export async function PUT() {
  await dbConnect();
  try {
    // Get all policies sorted by current order
    const policies = await Policy.find().sort({ order: 1, createdAt: 1 });

    // Reset orders sequentially
    const updatePromises = policies.map((policy, index) =>
      Policy.findByIdAndUpdate(policy._id, { order: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Policy orders reset successfully' });
  } catch (error) {
    console.error('Error resetting policy orders:', error);
    return NextResponse.json({ error: 'Failed to reset policy orders' }, { status: 500 });
  }
}