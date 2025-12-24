import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Location from '@/models/Location';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { direction } = await request.json();

    if (!direction || !['up', 'down'].includes(direction)) {
      return NextResponse.json({ error: 'Invalid direction. Must be "up" or "down"' }, { status: 400 });
    }

    // Find the current location
    const currentLocation = await Location.findById(id);
    if (!currentLocation) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    // Find all locations sorted by order
    const allLocations = await Location.find({}).sort({ order: 1 });

    const currentIndex = allLocations.findIndex(loc => loc._id.toString() === id);

    if (direction === 'up' && currentIndex > 0) {
      // Swap with the previous location
      const prevLocation = allLocations[currentIndex - 1];
      const tempOrder = currentLocation.order;
      currentLocation.order = prevLocation.order;
      prevLocation.order = tempOrder;

      await currentLocation.save();
      await prevLocation.save();
    } else if (direction === 'down' && currentIndex < allLocations.length - 1) {
      // Swap with the next location
      const nextLocation = allLocations[currentIndex + 1];
      const tempOrder = currentLocation.order;
      currentLocation.order = nextLocation.order;
      nextLocation.order = tempOrder;

      await currentLocation.save();
      await nextLocation.save();
    }

    return NextResponse.json({ message: 'Location moved successfully' });
  } catch (error) {
    console.error('Failed to move location:', error);
    return NextResponse.json({ error: 'Failed to move location' }, { status: 500 });
  }
}