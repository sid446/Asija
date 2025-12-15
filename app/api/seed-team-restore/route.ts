import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

const teamData = [
  {
    name: "Mr. N.C. Asija",
    role: "Founder & Managing Partner",
    qualifications: "B.Com (Hons), FCA, DISA (ICAI)",
    specialization: "Taxation & Compliance, Audit & Assurance, Business Advisory",
    experience: "40+ Years",
    membership: "082743",
    associationYears: "Since 1984",
    mobile: "+91 98110 75005",
    email: "ncasija@asija.in",
    description: "A visionary leader with over four decades of experience, Mr. N.C. Asija has been the driving force behind the firm's growth and reputation. His expertise spans across complex taxation matters, statutory audits, and strategic business advisory. He is known for his deep understanding of regulatory frameworks and his ability to provide practical solutions to intricate financial challenges. Under his mentorship, the firm has established itself as a trusted name in the industry.",
    linkedin: "https://www.linkedin.com/in/ncasija",
    order: 1
  },
  {
    name: "Mr. Sumit Asija",
    role: "Senior Partner",
    qualifications: "B.Com (Hons), FCA, DISA (ICAI), Certificate Course on Concurrent Audit of Banks",
    specialization: "Bank Audits, Corporate Taxation, Financial Consulting",
    experience: "20+ Years",
    membership: "500289",
    associationYears: "Since 2004",
    mobile: "+91 98101 66665",
    email: "sumit@asija.in",
    description: "With over two decades of expertise, Mr. Sumit Asija specializes in the banking sector and corporate taxation. He has successfully led numerous concurrent and statutory audits for major public and private sector banks. His analytical approach and attention to detail ensure that clients receive precise and compliant financial advice. He is also instrumental in guiding startups and SMEs through their financial planning and growth phases.",
    linkedin: "https://www.linkedin.com/in/sumitasija",
    order: 2
  },
  {
    name: "Mr. Amit Asija",
    role: "Senior Partner",
    qualifications: "B.Com (Hons), FCA, DISA (ICAI), Certificate Course on Concurrent Audit of Banks",
    specialization: "GST & Indirect Taxes, Risk Advisory, Corporate Law",
    experience: "18+ Years",
    membership: "506131",
    associationYears: "Since 2007",
    mobile: "+91 98100 66665",
    email: "amit@asija.in",
    description: "A dynamic professional with 18+ years of experience, Mr. Amit Asija heads the Indirect Tax and Risk Advisory practice. He is an expert in GST compliance, litigation, and corporate law matters. His proactive approach helps clients navigate the evolving tax landscape with ease. He is also actively involved in conducting seminars and workshops to educate clients on the latest tax amendments and compliance requirements.",
    linkedin: "https://www.linkedin.com/in/amitasija",
    order: 3
  },
  {
    name: "Mr. Ravinder Singh",
    role: "Partner",
    qualifications: "B.Com, FCA",
    specialization: "Statutory Audits, Tax Litigation, Financial Reporting",
    experience: "12+ Years",
    membership: "522688",
    associationYears: "Since 2012",
    mobile: "+91 97111 66665",
    email: "ravinder@asija.in",
    description: "Bringing over 12 years of specialized experience, Mr. Ravinder Singh focuses on statutory audits and tax litigation. He has a strong track record of representing clients before tax authorities and ensuring favorable outcomes. His in-depth knowledge of accounting standards and financial reporting makes him a key asset to the firm's audit practice.",
    linkedin: "",
    order: 4
  },
  {
    name: "Mr. S.K. Sikka",
    role: "Senior Manager (Audit & Taxation)",
    qualifications: "B.Com, CA (Inter)",
    specialization: "Internal Audits, Tax Compliance, Accounting Standards",
    experience: "40+ Years",
    membership: "",
    associationYears: "Since 1984",
    mobile: "+91 98110 75005",
    email: "sksikka@asija.in",
    description: "A seasoned professional with over 40 years of experience, Mr. S.K. Sikka is a pillar of the firm's audit and taxation department. His vast knowledge of internal controls and tax compliance ensures that clients maintain the highest standards of financial integrity. He plays a crucial role in mentoring junior staff and overseeing complex audit assignments.",
    linkedin: "",
    order: 5
  },
  {
    name: "Mr. Ankit Dhingra",
    role: "Manager (Audit & Taxation)",
    qualifications: "B.Com, CA (Inter)",
    specialization: "GST Compliance, Income Tax Returns, Financial Analysis",
    experience: "10+ Years",
    membership: "",
    associationYears: "Since 2014",
    mobile: "+91 98110 75005",
    email: "ankit@asija.in",
    description: "With over a decade of experience, Mr. Ankit Dhingra manages the day-to-day operations of the audit and taxation team. He specializes in GST compliance and income tax return filing for a diverse portfolio of clients. His efficiency and dedication ensure timely delivery of services and client satisfaction.",
    linkedin: "",
    order: 6
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Use native driver to bypass schema validation during cleanup
    if (mongoose.connection.db) {
        await mongoose.connection.db.collection('teams').deleteMany({});
        await mongoose.connection.db.collection('teams').insertMany(teamData.map(item => ({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        })));
    } else {
        throw new Error("Database connection not established");
    }

    return NextResponse.json({ message: 'Team data restored successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed team data' }, { status: 500 });
  }
}
