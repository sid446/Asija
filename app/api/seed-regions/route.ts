import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GlobalRegion from '@/models/GlobalRegion';

const regions = [
  {
    name: "Australia",
    slug: "australia",
    href: "/global-services/australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroTitle: "Services in Australia",
    heroDescription: "Supporting Australian businesses with robust financial and tech solutions.",
    contentHeading: "Excellence Down Under",
    contentDescription: "Our services for the Australian market focus on efficiency and compliance. We help businesses manage their ATO obligations, streamline bookkeeping, and leverage technology for better decision-making.",
    features: ['ATO Compliance & Taxation', 'Cloud Accounting (Xero/MYOB)', 'SMSF Administration', 'Business Advisory', 'Outsourced Payroll', 'Data Analytics & MIS'],
    order: 1
  },
  {
    name: "Canada",
    slug: "canada",
    href: "/global-services/canada",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1470&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1470&auto=format&fit=crop",
    heroTitle: "Services in Canada",
    heroDescription: "Reliable accounting and advisory services for Canadian enterprises.",
    contentHeading: "North American Expertise",
    contentDescription: "Navigating the Canadian financial landscape requires precision. We provide comprehensive support for CRA compliance, tax planning, and business strategy, helping you thrive in a competitive market.",
    features: ['CRA Tax Compliance', 'Bookkeeping & Financial Statements', 'Corporate Tax Planning', 'Payroll Services', 'Business Consulting', 'Tech-Enabled Reporting'],
    order: 2
  },
  {
    name: "UAE",
    slug: "uae",
    href: "/global-services/uae",
    image: "https://plus.unsplash.com/premium_photo-1661964303354-f0496d6d6e0b?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroImage: "https://plus.unsplash.com/premium_photo-1661964303354-f0496d6d6e0b?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heroTitle: "Services in UAE",
    heroDescription: "Comprehensive financial and tech solutions tailored for the dynamic UAE market.",
    contentHeading: "Empowering Business in the Middle East",
    contentDescription: "Asija Global Services provides specialized support for businesses operating in or expanding to the United Arab Emirates. From VAT compliance to corporate tax structuring, our team ensures your operations are efficient and compliant with local regulations.",
    features: ['VAT & Corporate Tax Compliance', 'Accounting & Bookkeeping', 'CFO Advisory Services', 'Business Setup & Licensing', 'Audit & Assurance', 'Technology Implementation'],
    order: 3
  },
  {
    name: "UK",
    slug: "uk",
    href: "/global-services/uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    heroTitle: "Services in UK",
    heroDescription: "Expert financial guidance and KPO services for the United Kingdom.",
    contentHeading: "Strategic Solutions for UK Enterprises",
    contentDescription: "We offer a full suite of accounting and advisory services designed to meet the rigorous standards of the UK market. Whether you need assistance with HMRC compliance, payroll, or strategic financial planning, our global team is here to support you.",
    features: ['HMRC Compliance & Tax Filing', 'Bookkeeping & Payroll', 'Virtual CFO Services', 'Financial Reporting (IFRS/UK GAAP)', 'Risk Advisory', 'Process Outsourcing'],
    order: 4
  },
  {
    name: "USA",
    slug: "usa",
    href: "/global-services/usa",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop",
    heroTitle: "Services in USA",
    heroDescription: "Strategic financial leadership and KPO solutions for US businesses.",
    contentHeading: "Driving Growth in the US Market",
    contentDescription: "From startups to established corporations, we provide the financial backbone your business needs. Our services cover IRS compliance, strategic CFO advisory, and advanced tech integration to keep you ahead of the curve.",
    features: ['IRS Tax Compliance & Filing', 'US GAAP Financial Reporting', 'Virtual CFO & Controller Services', 'QuickBooks/Xero Management', 'Business Valuation', 'Mergers & Acquisitions Support'],
    order: 5
  }
];

export async function GET() {
  await dbConnect();
  try {
    // Clear existing regions to avoid duplicates or just update them
    await GlobalRegion.deleteMany({});
    
    const createdRegions = await GlobalRegion.insertMany(regions);
    
    return NextResponse.json({ message: 'Seeded successfully', regions: createdRegions });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed regions' }, { status: 500 });
  }
}
