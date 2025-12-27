import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Policy from '@/models/Policy';

export async function GET() {
  await dbConnect();
  try {
    const policies = await Policy.find().sort({ order: 1, createdAt: -1 });
    // Ensure we always return an array
    const policiesArray = Array.isArray(policies) ? policies : [];
    return NextResponse.json(policiesArray);
  } catch (error) {
    console.error('Failed to fetch policies:', error);
    // Return empty array on error to prevent frontend crashes
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();

    // If no order is provided, assign the next available order
    if (body.order === undefined || body.order === null) {
      const lastPolicy = await Policy.findOne().sort({ order: -1 });
      body.order = lastPolicy ? lastPolicy.order + 1 : 0;
    }

    const policy = await Policy.create(body);
    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 });
  }
}
