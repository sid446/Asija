import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalServiceContent from '@/models/GlobalServiceContent';

export async function GET() {
  await dbConnect();
  try {
    let content = await GlobalServiceContent.findOne();
    if (!content) {
      content = await GlobalServiceContent.create({});
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    let content = await GlobalServiceContent.findOne();
    if (!content) {
      content = await GlobalServiceContent.create(body);
    } else {
      Object.assign(content, body);
      await content.save();
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
