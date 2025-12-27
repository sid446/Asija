import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Policy from '@/models/Policy';

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { updates } = await req.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Updates must be an array' }, { status: 400 });
    }

    // Update each policy's order
    const updatePromises = updates.map(({ id, order }: { id: string; order: number }) =>
      Policy.findByIdAndUpdate(id, { order })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Policy orders updated successfully' });
  } catch (error) {
    console.error('Error updating policy orders:', error);
    return NextResponse.json({ error: 'Failed to update policy orders' }, { status: 500 });
  }
}
