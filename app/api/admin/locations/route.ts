import { NextResponse } from 'next/server';
import { dbGet, dbMutate } from '@/lib/database';
import Location from '@/models/Location';

export async function GET() {
  try {
    const locations = await dbGet(async () => {
      return await Location.find({}).sort({ order: 1, createdAt: -1 });
    });

    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const location = await dbMutate(async () => {
      // Find the highest order value and assign the next one
      const highestOrderLocation = await Location.findOne({}).sort({ order: -1 });
      const nextOrder = highestOrderLocation ? highestOrderLocation.order + 1 : 0;

      return await Location.create({
        ...body,
        order: body.order !== undefined ? body.order : nextOrder
      });
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}
