import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

const teamData = [
  {
    name: "Mr. N.C. Asija",
    role: "Founder & Managing Partner",
    qualifications: [
      { title: "B.Com (Hons), FCA, DISA (ICAI)", description: "" }
    ],
    specialization: [
      { title: "Taxation & Compliance", description: "" },
      { title: "Audit & Assurance", description: "" },
      { title: "Business Advisory", description: "" }
    ],
    experience: [
      { 
        title: "40+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
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
    qualifications: [
      { title: "B.Com (Hons), FCA, DISA (ICAI)", description: "Certificate Course on Concurrent Audit of Banks" }
    ],
    specialization: [
      { title: "Bank Audits", description: "" },
      { title: "Corporate Taxation", description: "" },
      { title: "Financial Consulting", description: "" }
    ],
    experience: [
      { 
        title: "20+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
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
    qualifications: [
      { title: "B.Com (Hons), FCA, DISA (ICAI)", description: "Certificate Course on Concurrent Audit of Banks" }
    ],
    specialization: [
      { title: "GST & Indirect Taxes", description: "" },
      { title: "Risk Advisory", description: "" },
      { title: "Corporate Law", description: "" }
    ],
    experience: [
      { 
        title: "18+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
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
    qualifications: [
      { title: "B.Com, FCA", description: "" }
    ],
    specialization: [
      { title: "Statutory Audits", description: "" },
      { title: "Tax Litigation", description: "" },
      { title: "Financial Reporting", description: "" }
    ],
    experience: [
      { 
        title: "12+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
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
    qualifications: [
      { title: "B.Com, CA (Inter)", description: "" }
    ],
    specialization: [
      { title: "Internal Audits", description: "" },
      { title: "Tax Compliance", description: "" },
      { title: "Accounting Standards", description: "" }
    ],
    experience: [
      { 
        title: "40+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
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
    qualifications: [
      { title: "B.Com, CA (Inter)", description: "" }
    ],
    specialization: [
      { title: "GST Compliance", description: "" },
      { title: "Income Tax Returns", description: "" },
      { title: "Financial Analysis", description: "" }
    ],
    experience: [
      { 
        title: "10+ Years of Experience", 
        description: "",
        subItems: []
      }
    ],
    membership: "",
    associationYears: "Since 2014",
    mobile: "+91 98110 75005",
    email: "ankit@asija.in",
    description: "With over a decade of experience, Mr. Ankit Dhingra manages the day-to-day operations of the audit and taxation team. He specializes in GST compliance and income tax return filing for a diverse portfolio of clients. His efficiency and dedication ensure timely delivery of services and client satisfaction.",
    linkedin: "",
    order: 6
  },
  {
    name: "Aniket Gupta",
    role: "Associate Chartered Accountant",
    description: "Aniket Gupta is an Associate Chartered Accountant with over 1.5 years of professional experience in taxation, audit, accounting, and financial reporting. Known for his precision, analytical approach, and strong work ethic, he has supported a diverse portfolio of clients across corporate and non-corporate sectors. His international exposure—especially through full-cycle bookkeeping for U.S.-based clients—strengthens his capability to deliver high-quality financial solutions aligned with global standards.",
    experience: [
      { "title": "Taxation & Compliance", "description": "Specializes in Income Tax and TDS compliance, GST return filings, tax audits, and preparation of financial statements for a wide range of clients." },
      { "title": "Audit & Financial Reporting", "description": "Has handled statutory audits, internal audits, and financial reporting assignments with diligence and attention to detail, ensuring accuracy and adherence to regulatory requirements." },
      { "title": "International Bookkeeping & KPO Experience", "description": "Worked as a Senior Associate with one of India’s largest Knowledge Process Outsourcing (KPO) firms.\nManaged end-to-end bookkeeping for U.S.-based clients.", "subItems": ["Maintaining complete and accurate financial records", "Preparing financial statements", "Conducting financial analysis for management insight", "Working independently on complex accounting processes", "Certified in QuickBooks and Xero, bringing advanced capability in cloud-based accounting systems."] },
      { "title": "Analytical & Advisory Support", "description": "Provides detailed financial analysis and insights to support business decision-making and strengthen clients’ financial management frameworks." }
    ],
    specialization: [
      { "title": "Income Tax & TDS Compliance" },
      { "title": "GST Filing & Advisory" },
      { "title": "Statutory & Internal Audit" },
      { "title": "Financial Reporting & Analysis" },
      { "title": "U.S. Bookkeeping & KPO Operations" },
      { "title": "QuickBooks & Xero Certified Bookkeeper" },
      { "title": "Accounts Finalization & Reconciliations" },
      { "title": "Forensic Accounting (FAFD)" },
      { "title": "Cloud Accounting Systems" },
      { "title": "Analytical Review & Process Optimization" }
    ],
    qualifications: [
      { "title": "Associate Chartered Accountant (ACA)" },
      { "title": "Bachelor of Commerce (B. Com)" },
      { "title": "FAFD – Forensic Accounting & Fraud Detection (ICAI)" },
      { "title": "Certified QuickBooks Bookkeeper" },
      { "title": "Certified Xero Bookkeeper" }
    ],
    order: 7
  },
  {
    name: "CA Sunil Kumar Agarwal",
    role: "Fellow Chartered Accountant",
    description: "CA Sunil Kumar Agarwal is a Fellow Chartered Accountant with over 36 years of extensive experience in auditing, financial analysis, and examination of financial statements. With a long and distinguished tenure at the Comptroller & Auditor General of India (C&AG), he has contributed to high-impact audits across Public Sector Undertakings (PSUs) and government organizations throughout India. Known for his analytical acumen, professional integrity, and deep understanding of financial systems, he brings a balanced blend of technical expertise and strategic insight.",
    experience: [
      { "title": "C&AG – Public Sector & Government Audits", "description": "Led and contributed to audit engagements for major PSUs and government entities, providing in-depth evaluation of financial performance, compliance, and internal controls." },
      { "title": "Key Audit Engagements", "description": "", "subItems": ["Steel Authority of India Limited (SAIL)", "Pradeshiya Industrial & Investment Corporation of U.P. Ltd. (PICUP)", "Uttar Pradesh Rajkiya Nirman Nigam Limited (UPRNN)", "U.P. Jal Nigam", "Uttar Pradesh State Road Transport Corporation (UPSRTC)", "Lucknow Metro Rail Corporation", "Uttar Pradesh Expressways Industrial Development Authority (UPEIDA)", "Uttar Pradesh Forest Department and Corporation"] },
      { "title": "International & Multilateral Audit Exposure", "description": "Served as a C&AG auditor at Indian Embassies in Europe (2002–2005), gaining significant global exposure.\nAppointed as auditor for United Nations agencies including UNCC and ITC in Geneva (2018), delivering high-quality audit reviews and advisory services." },
      { "title": "Financial Advisory & Review", "description": "Recognized for delivering well-structured audits, financial insights, and recommendations with consistently strong client feedback." }
    ],
    specialization: [
      { "title": "Statutory & Government Audit" },
      { "title": "PSU Financial Review & Compliance" },
      { "title": "Public Sector Financial Management" },
      { "title": "Financial Analysis & Reporting" },
      { "title": "International Audit Standards & UN Agency Audits" },
      { "title": "Risk Assessment & Internal Controls Review" },
      { "title": "Analytical and Strategic Financial Insight" },
      { "title": "Expertise in Accounting Principles & Audit Methodologies" },
      { "title": "Competency in Industry-Standard Financial Software" }
    ],
    qualifications: [
      { "title": "Fellow Chartered Accountant (FCA)" },
      { "title": "Bachelor of Commerce (B. Com)" }
    ],
    order: 8
  },
  {
    name: "CA Padmaja Sunkad",
    role: "Senior Partner",
    description: "CA Padmaja Sunkad is a Senior Partner at Asija & Associates LLP, leading the Knowledge, Research, Training & Quality (KRTQ) Vertical of the firm. A practicing Chartered Accountant with over 20 years of experience, she has built deep expertise across finance, taxation, audit, risk management, wealth management, and professional training. Known for her multidisciplinary approach, strong communication skills, and pan-India exposure, she has contributed significantly to the firm’s knowledge ecosystem, client advisory, and training excellence.",
    experience: [
      { "title": "Leadership of the KRTQ Vertical", "description": "Heads the firm’s Knowledge, Research, Training & Quality division, responsible for developing technical content, ensuring quality standards, and strengthening the firm’s professional capabilities." },
      { "title": "Training & Capacity Building", "description": "Conducts training programs and workshops for corporates, government entities, UN bodies, and private clients on taxation, corporate law, audit, governance, and related domains.\nRegularly addresses client queries—especially in GST and Customs—and issues advisories on emerging legislative and procedural developments." },
      { "title": "Professional Practice & Multidisciplinary Expertise", "description": "Over 20 years of experience in finance, taxation, information systems, and wealth management.\nExpertise strengthened through multiple ICAI post-qualification courses in risk management, information systems audit, AI, CSR, and impact assessment." },
      { "title": "Industry & Geographic Experience", "description": "Extensive pan-India exposure through professional stints in Pune, Bengaluru, Bareilly, Lucknow, and Gurgaon, expanding the firm’s footprint across diverse working environments." },
      { "title": "Speaker, Faculty & Trainer", "description": "Regular speaker at GST sessions conducted by NACIN and NADT.\nFaculty for CA students on technical subjects and also a trained soft-skills instructor.\nHas undertaken confidential assignments for the Institute of Chartered Accountants of India (ICAI)." },
      { "title": "Multilingual Professional", "description": "Fluent in English, Hindi, Marathi, and Kannada, enabling effective communication with diverse stakeholder groups." }
    ],
    specialization: [
      { "title": "GST, Customs & Indirect Tax Advisory" },
      { "title": "Direct Tax, Corporate Law & Financial Regulations" },
      { "title": "Risk Management & Information Systems Audit" },
      { "title": "Wealth Management & Financial Advisory" },
      { "title": "Corporate Training & Knowledge Management" },
      { "title": "Audit, Quality Assurance & Technical Review" },
      { "title": "CSR & Impact Assessment" },
      { "title": "Research, Content Development & Thought Leadership" },
      { "title": "Soft Skills & Communication Training" },
      { "title": "Multilingual Communication (English, Hindi, Marathi, Kannada)" }
    ],
    qualifications: [
      { "title": "Fellow Chartered Accountant (FCA) – ICAI" },
      { "title": "DISA – Diploma in Information Systems Audit (ICAI, 2011)" },
      { "title": "DIRM – Diploma in Risk Management (ICAI, 2006)" },
      { "title": "AICA – Certificate Course in Artificial Intelligence (Level 1) (ICAI, 2024)" },
      { "title": "Certificate Course on Corporate Social Responsibility & Impact Assessment (ICAI, 2025)" },
      { "title": "Certified Yoga Instructor (YIC) – SVYASA Yoga University, Bengaluru (2022)" }
    ],
    order: 9
  },
  {
    name: "CMA Narayan Singh",
    role: "Cost and Management Accountant",
    description: "CMA Narayan Singh is a qualified Cost and Management Accountant (CMA) with an M. Com degree and over six years of diverse experience in the field of auditing. He has been actively involved in government audit, performance audit, and business development functions, working across a wide spectrum of industries and public sector entities. His analytical approach, technical proficiency, and ability to deliver value-driven audit solutions make him a key professional in the firm’s audit and development operations.",
    experience: [
      { "title": "Internal, Statutory, Process & Performance Audits", "description": "Extensive experience executing large and complex audits across multiple sectors, with a strong command over internal controls, compliance frameworks, and operational efficiency reviews." },
      { "title": "Government & Public Sector Audits", "description": "Worked with Central and State Public Sector Undertakings, including major Maharatna companies in the Power Sector (generation, transmission, distribution/Discoms).\nHas also handled audits for premier educational institutions, including Institutes of National Importance, and various government-funded projects." },
      { "title": "Construction & Infrastructure Sector Audits", "description": "Conducted detailed audits focusing on project management, contract compliance, cost analysis, and performance evaluation." },
      { "title": "Business Development & Strategic Support", "description": "Plays a significant role in procurement and the preparation, evaluation, and submission of RFPs/EOIs, driving the firm’s participation in competitive bids.\nExperienced in working with GeM (Government e-Marketplace) and other e-tendering portals, ensuring seamless and compliant bidding processes." },
      { "title": "Dual Functional Contribution", "description": "Combines audit expertise with strategic business development responsibilities, contributing to both operational excellence and organizational growth." }
    ],
    specialization: [
      { "title": "Internal, Statutory, Process & Performance Audits" },
      { "title": "Government & PSU Audit" },
      { "title": "Power Sector Audit (Generation, Transmission, Distribution)" },
      { "title": "Educational Institutions & Government Project Audits" },
      { "title": "Construction & Infrastructure Audit" },
      { "title": "RFP/EOI Preparation & Procurement Management" },
      { "title": "GeM & E-Tendering Portal Expertise" },
      { "title": "Business Development & Bid Management" },
      { "title": "Analytical Review & Compliance Assessment" }
    ],
    qualifications: [
      { "title": "Cost and Management Accountant (CMA)" },
      { "title": "Master of Commerce (M. Com)" }
    ],
    order: 10
  },
  {
    name: "CA Naeem Khan",
    role: "Chartered Accountant",
    description: "CA Naeem Khan is a practicing Chartered Accountant based in Lucknow with over four years of post-qualification experience in finance, taxation, audit, and commercial operations. Known for his analytical approach, precision, and commitment to client service, he supports organizations with robust tax, financial, and compliance solutions. His expanding international exposure positions him as a key contributor to the firm’s global initiatives.",
    experience: [
      { "title": "Taxation & Litigation", "description": "Specializes in Income Tax Litigation, representing clients before the Income Tax Appellate Tribunal (ITAT) and assisting with assessment, appeals, compliance, and advisory matters." },
      { "title": "Audit & Assurance", "description": "Has managed statutory audits, internal audits, due diligence assignments, and finalization of accounts across a wide range of industries and business structures." },
      { "title": "Tax Compliance & Filings", "description": "Experienced in GST and Income Tax return filings, ensuring accurate preparation, statutory compliance, and efficient execution of assignments." },
      { "title": "Corporate & Commercial Services", "description": "Handles company registrations, accounting systems setup, and financial reporting for corporates, SMEs, and professionals." },
      { "title": "International Desk & Expansion Initiatives", "description": "Currently spearheads the firm’s international expansion, with a dedicated focus on the UK Desk and cross-border service delivery." }
    ],
    specialization: [
      { "title": "Income Tax Litigation & ITAT Representation" },
      { "title": "Direct & Indirect Tax Compliance" },
      { "title": "GST Advisory & Filings" },
      { "title": "Statutory, Internal & Tax Audits" },
      { "title": "Due Diligence & Financial Reporting" },
      { "title": "Company Registration & Corporate Compliance" },
      { "title": "Cross-Border Advisory & International Desk Operations" },
      { "title": "Analytical Review & Commercial Operations" }
    ],
    qualifications: [
      { "title": "Chartered Accountant (CA)" },
      { "title": "Bachelor of Commerce (B. Com)" },
      { "title": "FAFD – Forensic Accounting & Fraud Detection (ICAI)" },
      { "title": "CPA (Ireland)" },
      { "title": "CFA – Level II Candidate" }
    ],
    order: 11
  },
  {
    name: "CA. Anand Prakash Srivastava",
    role: "Fellow Chartered Accountant",
    description: "CA. Anand Prakash Srivastava is a seasoned finance professional with over 22 years of experience across industry and public practice. A Fellow Chartered Accountant (ICAI, India), CPA (Australia), and Associate Chartered Accountant (ICAEW, England), he has built a strong reputation for strategic governance, financial leadership, and mentoring.\nHis career includes 15+ years in senior finance roles across telecom and insurance and 7+ years in public practice, advising a diverse range of Indian and international clients. Known for his strategic acumen, governance depth, and technology-driven approach, he supports organizations in building resilient financial and operational frameworks.",
    experience: [
      { "title": "Industry Leadership (Telecom & Insurance – 15+ years)", "description": "", "subItems": ["Held senior finance leadership positions at HDFC Life Insurance, Essar Telecom, Tata Teleservices, and Reliance Communications.", "Part of the core finance team for HDFC Life’s IPO (2017), leading zonal accounts across seven states and managing consolidation for the company’s Dubai subsidiary.", "Led compliance, governance, and finance operations across multiple geographies, ensuring efficiency, regulatory alignment, and business strategy execution."] },
      { "title": "Public Practice & Advisory (7+ years)", "description": "", "subItems": ["Provides audit, assurance, and compliance services, including UN HACT assignments, systems audit, and corporate governance reviews.", "Offers specialized advisory in forensic accounting, financial planning, risk management, and knowledge process outsourcing (KPO).", "Advises corporates, institutions, and startups on financial structuring, compliance frameworks, and organizational governance."] }
    ],
    specialization: [
      { "title": "Strategic Finance & Leadership" },
      { "title": "Corporate Governance & Compliance" },
      { "title": "Audit, Assurance & UN HACT Assignments" },
      { "title": "Forensic Accounting & FAFD" },
      { "title": "Risk Management & Regulatory Alignment" },
      { "title": "Financial Planning & Wealth Management" },
      { "title": "Ind-AS & Government Accounting" },
      { "title": "Systems Audit & Technology-Enabled Processes" },
      { "title": "KPO & Outsourced Financial Operations" },
      { "title": "Mentoring, Team Leadership & Change Management" }
    ],
    qualifications: [
      { "title": "Fellow Chartered Accountant (FCA) – ICAI, India" },
      { "title": "Certified Public Accountant (CPA) – Australia" },
      { "title": "Associate Chartered Accountant (ACA) – ICAEW, England" },
      { "title": "FAFD (Forensic Accounting & Fraud Detection) – ICAI" },
      { "title": "Certifications in Wealth Management, Government Accounting, and Ind-AS" },
      { "title": "Executive Education: IIM Ahmedabad – Innovate, Disrupt & Change" },
      { "title": "Executive Education: ISB Hyderabad – Analytical Thinking, Managerial Effectiveness & Leading in Times of Change" }
    ],
    order: 12
  },
  {
    name: "CA. Ashish Kapoor",
    role: "Senior Partner",
    description: "CA. Ashish Kapoor is the Senior Partner at Asija & Associates LLP, a premier Chartered Accountancy firm with a legacy of over 39 years. With more than two decades of experience, he has played a pivotal role in advising organizations across diverse sectors including technology services, financial services, automotive, infrastructure, education, and manufacturing. Known for his strategic insight, analytical depth, and strong communication skills, he blends technical expertise with practical solutions to support sustainable business growth.",
    experience: [
      { "title": "Senior Partner, Asija & Associates LLP", "description": "Leads the firm’s taxation and advisory practice, guiding corporates, government bodies, and international institutions on complex regulatory and financial matters." },
      { "title": "Taxation & Litigation Specialist", "description": "Extensive experience in Direct and Indirect Taxation, including Income Tax Litigation, GST advisory, and Benami Law." },
      { "title": "Regulatory & Compliance Advisor", "description": "Advises FinTech and large enterprises on compliance frameworks, financial governance, and evolving regulatory landscapes." },
      { "title": "Representation Before Authorities", "description": "Represents clients before the Income Tax Appellate Authority, Company Law Board, and appellate authorities under the PMLA and the Benami Transactions Act." },
      { "title": "Speaker & Trainer", "description": "Frequently invited to speak at platforms such as ICAI, RBI, IIMs, NADT, NACIN, and leading corporates, delivering sessions on GST reforms, taxation of charitable trusts, litigation strategy, internal controls, and financial governance." },
      { "title": "Author & Thought Leader", "description": "Regular contributor to professional publications and journals on tax reforms, compliance issues, governance standards, and emerging regulatory trends." }
    ],
    specialization: [
      { "title": "Direct Taxation" },
      { "title": "Indirect Taxation & GST" },
      { "title": "Income Tax Litigation" },
      { "title": "Benami Law & PMLA Advisory" },
      { "title": "Financial Regulations & Compliance" },
      { "title": "FinTech Advisory" },
      { "title": "Internal Controls & Governance Frameworks" },
      { "title": "Consulting & Litigation Strategy" },
      { "title": "Corporate & Institutional Advisory" },
      { "title": "Public Speaking & Training" },
      { "title": "Technical Writing & Thought Leadership" }
    ],
    qualifications: [
      { "title": "Fellow Chartered Accountant (FCA) – Institute of Chartered Accountants of India" },
      { "title": "Bachelor of Commerce (B. Com)" },
      { "title": "Certified Concurrent Auditor of Bank" },
      { "title": "Certified Peer Review Auditor" }
    ],
    order: 13
  },
  {
    name: "CA Ruchi Kapoor",
    role: "Senior Partner, CFO & Head of HR",
    description: "CA Ruchi Kapoor is a Senior Partner at Asija & Associates LLP, a legacy Chartered Accountancy firm with a distinguished history of 39 years. Beyond her professional pursuits, she is passionate about sports and community engagement, which led her to serve as the Chairperson of the Chartered Accountants Sports Association in 2024.",
    experience: [
      { "title": "Senior Partner, Chief Finance Officer & Head of HR, Asija & Associates LLP", "description": "", "subItems": ["Plays a pivotal role in strategic decision-making, financial governance, and people management.", "Has over 19 years of experience in providing advisory services and leading organizational initiatives."] },
      { "title": "Speaker & Trainer", "description": "Delivered presentations and training sessions for government and educational institutions.", "subItems": ["POSH Act for newly recruited Income Tax Officers", "Importance of Nomination & Financial Literacy for 1500+ staff and teachers of Lucknow Public School", "Multiple sessions for Income Tax Officers at NADT and other departmental forums"] }
    ],
    specialization: [
      { "title": "Financial strategy and advisory" },
      { "title": "Leadership and people management" },
      { "title": "Human resource management" },
      { "title": "Public speaking and training" },
      { "title": "Strategic planning and organizational governance" },
      { "title": "Community engagement and sports leadership" }
    ],
    qualifications: [
      { "title": "Chartered Accountant (CA), Institute of Chartered Accountants of India (ICAI)" }
    ],
    order: 14
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

    return NextResponse.json({ message: 'Team data structured successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed team data' }, { status: 500 });
  }
}
