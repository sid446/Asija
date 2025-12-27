import { NextResponse } from 'next/server';
import ContactContent from '@/models/ContactContent';
import dbConnect from '@/lib/mongodb';export async function GET() {
  try {
    await dbConnect();
    let content = await ContactContent.findOne();

    if (!content) {
      // Seed with default data if not exists
      content = await ContactContent.create({
        tagline: 'Contact us',
        title: 'Connect With Us',
        description: "We'd love to hear from you! Please get in touch.",
        officeLocations: 'Office Locations',
        officeLocation1: '1st floor, 34/5 Gokhale Marg,',
        officeLocation2: 'Lucknow, U.P. (India) – 226001',
        contactNo: 'Contact No.',
        phone1: '0522-4004652',
        phone2: '0522-2205072',
        emails: 'Email',
        email1: 'admin@asija.in',
        email2: 'contact@asija.in',
        enquiryForm: 'Enquiry Form / Consult Us',
        imageAlt: 'Asija team in creative studio',
        image: '/aboutUs.jpg'
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching contact content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const content = await ContactContent.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating contact content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
