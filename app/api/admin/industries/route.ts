import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Industry from '@/models/Industry';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const industries = await Industry.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ items: industries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    
    // Get the highest order to append to the end
    const lastIndustry = await Industry.findOne().sort({ order: -1 });
    const newOrder = lastIndustry ? lastIndustry.order + 1 : 0;

    const industry = await Industry.create({ ...body, order: newOrder });
    return NextResponse.json({ message: 'Industry created', item: industry }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create industry' }, { status: 500 });
  }
}
