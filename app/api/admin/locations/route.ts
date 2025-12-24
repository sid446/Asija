import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Location from '@/models/Location';

export async function GET() {
  try {
    await connectToDatabase();
    const locations = await Location.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Find the highest order value and assign the next one
    const highestOrderLocation = await Location.findOne({}).sort({ order: -1 });
    const nextOrder = highestOrderLocation ? highestOrderLocation.order + 1 : 0;

    const location = await Location.create({
      ...body,
      order: body.order !== undefined ? body.order : nextOrder
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}
