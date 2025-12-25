import { NextResponse } from 'next/server';
import { dbGet, dbMutate } from '@/lib/database';
import Team from '@/models/Team';

export async function GET() {
  try {
    const items = await dbGet(async () => {
      return await Team.find({}).sort({ order: 1, createdAt: -1 }).lean();
    });

    return NextResponse.json({ items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, role, avatar, linkedin, qualifications,
      specialization, experience, membership,
      associationYears, mobile, email, description, order
    } = body;

    if (!name) return NextResponse.json({ message: 'Name is required' }, { status: 400 });

    const team = await dbMutate(async () => {
      return await Team.create({
        name, role, avatar, linkedin, qualifications,
        specialization, experience, membership,
        associationYears, mobile, email, description,
        order: order || 0
      });
    });

    return NextResponse.json({ team });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to create team' }, { status: 500 });
  }
}
