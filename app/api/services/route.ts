import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await dbConnect();
      const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
      return NextResponse.json(services);
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
