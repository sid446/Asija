import { NextResponse } from 'next/server';
import AboutContent from '@/models/AboutContent';
import dbConnect from '@/lib/mongodb';
import { dbGet, dbMutate } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await dbConnect();
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
          peopleTitle: 'Our People – The Heart of Our Firm',
          peopleDescription1: 'Today, our firm proudly comprises more than 100 professionals, including qualified chartered accountants, semi-qualified managers, and skilled executives. This diverse and talented team represents a balanced mix of experience, technical capability, and youthful energy.',
          peopleDescription2: 'This inclusive workforce drives innovation, collaboration, and excellence across all our assignments.',
          peopleStats: [
            { label: 'Female Professionals', percentage: 42 },
            { label: 'Male Professionals', percentage: 58 }
          ],
          futureTitle: 'Looking Ahead',
          futureSubtitle: 'Our Vision for the Future',
          futureDescription1: 'As Asija & Associates LLP continues to expand its footprint across India and beyond, we remain deeply committed to our founding values of integrity, excellence, and professional independence. With a growing global presence, a strengthened leadership team, and a dynamic workforce, we are poised to embrace new opportunities in audit, advisory, compliance, systems, and development-sector consulting.',
          futureDescription2: 'Our journey ahead is guided by innovation, technology-driven solutions, and a steadfast focus on delivering measurable value to clients. We look forward with pride, purpose, and confidence as we continue to build a firm that stands for trust, quality, and global capability.',
        });
      }

      return NextResponse.json(content);
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    return await dbMutate(async () => {
      await dbConnect();
      const data = await request.json();

      // Update the first document found, or create if it doesn't exist (upsert)
      const content = await AboutContent.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });

      return NextResponse.json(content);
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
