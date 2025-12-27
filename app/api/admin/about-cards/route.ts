import { NextResponse } from 'next/server';
import AboutCard from '@/models/AboutCard';
import dbConnect from '@/lib/mongodb';const seedData = [
  {
    image: '/mission1.jpg',
    title: 'Vision & Mission',
    description: 'Achieve significant presence in every region of the country. Provide client-defined, quality services on global standards. Offer balanced threefold services in Audit, Taxation & Consultancy. Place clients’ interests ahead of the firm. Emerge as a leader in CA firms through dedication and quality. Be a well-recognized firm that fosters client needs and is the aspired choice for trainees. We continuously seek value-added knowledge for our people, clients, and society, blending professionalism with excellence.',
    buttonContent: 'Discover Our Purpose',
    link: '/about',
    order: 1
  },
  {
    image: '/histoy.jpg',
    title: 'Our Rich History',
    description: 'With over 39 years of excellence, founded on 1st April 1986 by CA Uttam Chandra Asija. A trusted name serving Government, Corporate & Private sectors. Pioneered excellence in Accounting, Auditing, Taxation, Assurance, and Business Advisory with a strong focus on client satisfaction.',
    buttonContent: 'Explore Our Journey',
    link: '/about',
    order: 2
  },
  {
    image: '/img1.jpg',
    title: 'Area & Infrastructure',
    description: 'Spanning 6,050 sq.ft. — one of Lucknow’s largest CA offices. Fully air-conditioned with generator & inverter backup. Strategically located in the commercial hub. Divided into dedicated verticals: Audit & Assurance (2,800 sq.ft.), Taxation (1,250 sq.ft.), Corporate Law & Admin (2,000 sq.ft.). Committed to personal and professional growth.',
    buttonContent: 'See Our Space',
    link: '/about',
    order: 3
  },
  {
    image: '/img2.jpg',
    title: 'Networking',
    description: 'High-speed Wi-Fi across all terminals. Multiple laser & inkjet printers. 24/7 dedicated internet. High-tech servers with access control. Individual @asija.in email IDs for all partners and staff. Seamless, secure, and efficient digital infrastructure.',
    buttonContent: 'Connect with Us',
    link: '/about',
    order: 4
  },
  {
    image: '/about1.jpg',
    title: 'Data Security & Safety',
    description: 'Client confidentiality is paramount. Multi-layered protection: professional antivirus, password security, role-based access. Only authorized personnel can modify data. Robust, reliable, and trusted.',
    buttonContent: 'Learn About Our Security',
    link: '/about',
    order: 5
  },
  {
    image: '/about2.jpg',
    title: 'Culture',
    description: 'We are a family. We value integrity, teamwork, and growth. Every member is empowered with responsibility under experienced partners. Excellence is our culture — not a goal. We respect knowledge, skills, and individuality while delivering quality with professionalism.',
    buttonContent: 'Discover Our Culture',
    link: '/about',
    order: 6
  },
];

export async function GET() {
  try {
    await dbConnect();
    let cards = await AboutCard.find().sort({ order: 1 });

    if (cards.length === 0) {
      cards = await AboutCard.insertMany(seedData);
    }

    return NextResponse.json({ items: cards });
  } catch (error) {
    console.error('Error fetching about cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const card = await AboutCard.create(data);
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error creating about card:', error);
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
  }
}
