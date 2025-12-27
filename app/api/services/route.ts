import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await dbConnect();
      const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
      // Ensure we always return an array
      const servicesArray = Array.isArray(services) ? services : [];
      return NextResponse.json(servicesArray);
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    // Return empty array on error to prevent frontend crashes
    return NextResponse.json([]);
  }
}
