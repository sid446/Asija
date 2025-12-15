import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalOffering from '@/models/GlobalOffering';

export async function GET() {
  await dbConnect();
  try {
    const offerings = await GlobalOffering.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(offerings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch offerings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const offering = await GlobalOffering.create(body);
    return NextResponse.json(offering, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create offering' }, { status: 500 });
  }
}
