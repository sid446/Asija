import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import FAQ from '@/models/FAQ';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asija';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

const seedData = [
  {
    question: 'What are your business hours?',
    answer: 'Our customer service team is available Monday–Friday from 9:00 AM to 8:00 PM IST. Weekends: 10:00 AM to 6:00 PM IST. Holiday hours will be updated on our site.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers. For enterprise clients, we also support invoicing.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping times and costs vary by location. You can view estimated delivery times at checkout.',
  },
];

export async function GET() {
  try {
    await connectDB();
    let faqs = await FAQ.find().sort({ createdAt: 1 });

    if (faqs.length === 0) {
      faqs = await FAQ.insertMany(seedData);
    }

    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const faq = await FAQ.create(body);
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
