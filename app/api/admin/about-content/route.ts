import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AboutContent from '@/models/AboutContent';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();
    let content = await AboutContent.findOne();

    if (!content) {
      // Seed with default data if not exists
      content = await AboutContent.create({
        title: 'Our Legacy of Trust',
        quote: 'Coming together is a beginning, keeping together is progress, working together is success.',
        description1: 'Asija & Associates LLP, Chartered Accountants was established on 1st April 1986 by our founder member CA. Uttam Chandra Asija with the aim of providing a wide range of Accounting and Financial services to clients in the Government, Corporate, and Private Sectors.',
        description2: 'Over the years, the firm has been built around a team of professionals possessing vast experience in auditing, accounting, taxation, company law matters, and a host of other financial services. We assist clients in solving complex problems and support the growth of society at large.',
        description3: 'Our firm has not only augmented in knowledge and skills but has also established a landmark achievement by becoming the first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership.',
        description4: 'We, at Asija, aim to deliver quality to our stakeholders and strive to be the best at everything we do. We believe in working together to fulfill the needs of our clients beyond their expectations.',
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Update the first document found, or create if it doesn't exist (upsert)
    const content = await AboutContent.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
