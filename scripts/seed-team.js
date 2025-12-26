const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("MONGODB_URI:", process.env.MONGODB_URI);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/asija"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Team Schema
const SectionItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    subItems: [{ type: String }],
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String },
    linkedin: { type: String },
    qualifications: [SectionItemSchema],
    specialization: [SectionItemSchema],
    experience: [SectionItemSchema],
    membership: { type: String },
    associationYears: { type: String },
    mobile: { type: String },
    email: { type: String },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

// Sample team data
const sampleTeam = [
  {
    name: "CA Sunil Kumar Agarwal",
    role: "Partner",
    description:
      "CA Sunil Kumar Agarwal is a Fellow Chartered Accountant with over 36 years of extensive experience in auditing, financial analysis, and examination of financial statements. With a long and distinguished tenure at the Comptroller & Auditor General of India (C&AG), he has contributed to high-impact audits across Public Sector Undertakings (PSUs) and government organizations throughout India. Known for his analytical acumen, professional integrity, and deep understanding of financial systems, he brings a balanced blend of technical expertise and strategic insight.",
    experience: [
      {
        title: "C&AG – Public Sector & Government Audits",
        description:
          "Led and contributed to audit engagements for major PSUs and government entities, providing in-depth evaluation of financial performance, compliance, and internal controls.",
        subItems: [],
      },
      {
        title: "Key Audit Engagements",
        description: "",
        subItems: [
          "Steel Authority of India Limited (SAIL)",
          "Pradeshiya Industrial & Investment Corporation of U.P. Ltd. (PICUP)",
          "U.P. Jal Nigam",
          "Uttar Pradesh Rajkiya Nirman Nigam Limited (UPRNN)",
          "U.P. Jal Nigam",
          "Uttar Pradesh State Road Transport Corporation (UPSRTC)",
          "Lucknow Metro Rail Corporation",
          "Uttar Pradesh Expressways Industrial Development Authority (UPEIDA)",
          "Uttar Pradesh Forest Department and Corporation",
        ],
      },
      {
        title: "International & Multilateral Audit Exposure",
        description:
          "Served as a C&AG auditor at Indian Embassies in Europe (2002–2005), gaining significant global exposure.\nAppointed as auditor for United Nations agencies including UNCC and ITC in Geneva (2018), delivering high-quality audit reviews and advisory services.",
        subItems: [],
      },
      {
        title: "Financial Advisory & Review",
        description:
          "Recognized for delivering well-structured audits, financial insights, and recommendations with consistently strong client feedback.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Statutory & Government Audit",
        subItems: [],
      },
      {
        title: "PSU Financial Review & Compliance",
        subItems: [],
      },
      {
        title: "Public Sector Financial Management",
        subItems: [],
      },
      {
        title: "Financial Analysis & Reporting",
        subItems: [],
      },
      {
        title: "International Audit Standards & UN Agency Audits",
        subItems: [],
      },
      {
        title: "Risk Assessment & Internal Controls Review",
        subItems: [],
      },
      {
        title: "Analytical and Strategic Financial Insight",
        subItems: [],
      },
      {
        title: "Expertise in Accounting Principles & Audit Methodologies",
        subItems: [],
      },
      {
        title: "Competency in Industry-Standard Financial Software",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Fellow Chartered Accountant (FCA)",
        subItems: [],
      },
      {
        title: "Bachelor of Commerce (B. Com)",
        subItems: [],
      },
    ],
    order: 12,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1766211394/asija-team/cjp3z7hzpz5jzdyosbka.jpg",
    email: "sunil.agrawal@asija.in",
    linkedin: "",
    membership: "",
    mobile: "",
  },
  {
    name: "CMA Narayan Singh",
    role: "Associate Director",
    description:
      "CMA Narayan Singh is a qualified Cost and Management Accountant (CMA) with an M. Com degree and over six years of diverse experience in the field of auditing. He has been actively involved in government audit, performance audit, and business development functions, working across a wide spectrum of industries and public sector entities. His analytical approach, technical proficiency, and ability to deliver value-driven audit solutions make him a key professional in the firm’s audit and development operations.",
    experience: [
      {
        title: "Internal, Statutory, Process & Performance Audits",
        description:
          "Extensive experience executing large and complex audits across multiple sectors, with a strong command over internal controls, compliance frameworks, and operational efficiency reviews.",
        subItems: [],
      },
      {
        title: "Government & Public Sector Audits",
        description:
          "Worked with Central and State Public Sector Undertakings, including major Maharatna companies in the Power Sector (generation, transmission, distribution/Discoms).\nHas also handled audits for premier educational institutions, including Institutes of National Importance, and various government-funded projects.",
        subItems: [],
      },
      {
        title: "Construction & Infrastructure Sector Audits",
        description:
          "Conducted detailed audits focusing on project management, contract compliance, cost analysis, and performance evaluation.",
        subItems: [],
      },
      {
        title: "Business Development & Strategic Support",
        description:
          "Plays a significant role in procurement and the preparation, evaluation, and submission of RFPs/EOIs, driving the firm’s participation in competitive bids.\nExperienced in working with GeM (Government e-Marketplace) and other e-tendering portals, ensuring seamless and compliant bidding processes.",
        subItems: [],
      },
      {
        title: "Dual Functional Contribution",
        description:
          "Combines audit expertise with strategic business development responsibilities, contributing to both operational excellence and organizational growth.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Internal, Statutory, Process & Performance Audits",
        subItems: [],
      },
      {
        title: "Government & PSU Audit",
        subItems: [],
      },
      {
        title: "Power Sector Audit (Generation, Transmission, Distribution)",
        subItems: [],
      },
      {
        title: "Educational Institutions & Government Project Audits",
        subItems: [],
      },
      {
        title: "Construction & Infrastructure Audit",
        subItems: [],
      },
      {
        title: "RFP/EOI Preparation & Procurement Management",
        subItems: [],
      },
      {
        title: "GeM & E-Tendering Portal Expertise",
        subItems: [],
      },
      {
        title: "Business Development & Bid Management",
        subItems: [],
      },
      {
        title: "Analytical Review & Compliance Assessment",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Cost and Management Accountant (CMA)",
        subItems: [],
      },
      {
        title: "Master of Commerce (M. Com)",
        subItems: [],
      },
    ],
    order: 16,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1766211598/asija-team/w3v2umzkadpswaxzznby.jpg",
    email: "narayan.singh@asija.in",
    linkedin: "https://www.linkedin.com/in/narayan-singh-691200148/",
    membership: "",
    mobile: "+91-9559990007",
  },
  {
    name: "CA Padmaja Sunkad",
    role: "Senior Partner",
    description:
      "CA Padmaja Sunkad is a Senior Partner at Asija & Associates LLP, leading the Knowledge, Research, Training & Quality (KRTQ) Vertical of the firm. A practicing Chartered Accountant with over 20 years of experience, she has built deep expertise across finance, taxation, audit, risk management, wealth management, and professional training. Known for her multidisciplinary approach, strong communication skills, and pan-India exposure, she has contributed significantly to the firm’s knowledge ecosystem, client advisory, and training excellence.",
    experience: [
      {
        title: "Leadership of the KRTQ Vertical",
        description:
          "Heads the firm’s Knowledge, Research, Training & Quality division, responsible for developing technical content, ensuring quality standards, and strengthening the firm’s professional capabilities.",
        subItems: [],
      },
      {
        title: "Training & Capacity Building",
        description:
          "Conducts training programs and workshops for corporates, government entities, UN bodies, and private clients on taxation, corporate law, audit, governance, and related domains.\nRegularly addresses client queries—especially in GST and Customs—and issues advisories on emerging legislative and procedural developments.",
        subItems: [],
      },
      {
        title: "Professional Practice & Multidisciplinary Expertise",
        description:
          "Over 20 years of experience in finance, taxation, information systems, and wealth management.\nExpertise strengthened through multiple ICAI post-qualification courses in risk management, information systems audit, AI, CSR, and impact assessment.",
        subItems: [],
      },
      {
        title: "Industry & Geographic Experience",
        description:
          "Extensive pan-India exposure through professional stints in Pune, Bengaluru, Bareilly, Lucknow, and Gurgaon, expanding the firm’s footprint across diverse working environments.",
        subItems: [],
      },
      {
        title: "Speaker, Faculty & Trainer",
        description:
          "Regular speaker at GST sessions conducted by NACIN and NADT.\nFaculty for CA students on technical subjects and also a trained soft-skills instructor.\nHas undertaken confidential assignments for the Institute of Chartered Accountants of India (ICAI).",
        subItems: [],
      },
      {
        title: "Multilingual Professional",
        description:
          "Fluent in English, Hindi, Marathi, and Kannada, enabling effective communication with diverse stakeholder groups.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "GST, Customs & Indirect Tax Advisory",
        subItems: [],
      },
      {
        title: "Direct Tax, Corporate Law & Financial Regulations",
        subItems: [],
      },
      {
        title: "Risk Management & Information Systems Audit",
        subItems: [],
      },
      {
        title: "Wealth Management & Financial Advisory",
        subItems: [],
      },
      {
        title: "Corporate Training & Knowledge Management",
        subItems: [],
      },
      {
        title: "Audit, Quality Assurance & Technical Review",
        subItems: [],
      },
      {
        title: "CSR & Impact Assessment",
        subItems: [],
      },
      {
        title: "Research, Content Development & Thought Leadership",
        subItems: [],
      },
      {
        title: "Soft Skills & Communication Training",
        subItems: [],
      },
      {
        title: "Multilingual Communication (English, Hindi, Marathi, Kannada)",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Fellow Chartered Accountant (FCA) – ICAI",
        subItems: [],
      },
      {
        title: "DISA – Diploma in Information Systems Audit (ICAI, 2011)",
        subItems: [],
      },
      {
        title: "DIRM – Diploma in Risk Management (ICAI, 2006)",
        subItems: [],
      },
      {
        title:
          "AICA – Certificate Course in Artificial Intelligence (Level 1) (ICAI, 2024)",
        subItems: [],
      },
      {
        title:
          "Certificate Course on Corporate Social Responsibility & Impact Assessment (ICAI, 2025)",
        subItems: [],
      },
      {
        title:
          "Certified Yoga Instructor (YIC) – SVYASA Yoga University, Bengaluru (2022)",
        subItems: [],
      },
    ],
    order: 7,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821320/asija-team/mhf7hoe7vhxz8urhvcyn.jpg",
    email: "padmaja.sunkad@asija.in",
    linkedin: "https://www.linkedin.com/in/padmaja-sunkad/",
    membership: "",
    mobile: "",
  },
  {
    name: "CA Aniket Gupta",
    role: "Associate Director",
    description:
      "Aniket Gupta is an Associate Chartered Accountant with over 1.5 years of professional experience in taxation, audit, accounting, and financial reporting. Known for his precision, analytical approach, and strong work ethic, he has supported a diverse portfolio of clients across corporate and non-corporate sectors. His international exposure—especially through full-cycle bookkeeping for U.S.-based clients—strengthens his capability to deliver high-quality financial solutions aligned with global standards.",
    experience: [
      {
        title: "Taxation & Compliance",
        description:
          "Specializes in Income Tax and TDS compliance, GST return filings, tax audits, and preparation of financial statements for a wide range of clients.",
        subItems: [],
      },
      {
        title: "Audit & Financial Reporting",
        description:
          "Has handled statutory audits, internal audits, due diligence assignments, and financial reporting with diligence and attention to detail, ensuring accuracy and adherence to regulatory requirements.",
        subItems: [],
      },
      {
        title: "International Bookkeeping & KPO Experience",
        description:
          "Worked as a Senior Associate with one of India’s largest Knowledge Process Outsourcing (KPO) firms.\nManaged end-to-end bookkeeping for U.S.-based clients.",
        subItems: [
          "Maintaining complete and accurate financial records",
          "Preparing financial statements",
          "Conducting financial analysis for management insight",
          "Working independently on complex accounting processes",
          "Certified in QuickBooks and Xero, bringing advanced capability in cloud-based accounting systems.",
        ],
      },
      {
        title: "Analytical & Advisory Support",
        description:
          "Provides detailed financial analysis and insights to support business decision-making and strengthen clients’ financial management frameworks.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Income Tax & TDS Compliance",
        subItems: [],
      },
      {
        title: "GST Filing & Advisory",
        subItems: [],
      },
      {
        title: "Statutory & Internal Audit",
        subItems: [],
      },
      {
        title: "Financial Reporting & Analysis",
        subItems: [],
      },
      {
        title: "U.S. Bookkeeping & KPO Operations",
        subItems: [],
      },
      {
        title: "QuickBooks & Xero Certified Bookkeeper",
        subItems: [],
      },
      {
        title: "Accounts Finalization & Reconciliations",
        subItems: [],
      },
      {
        title: "Forensic Accounting (FAFD)",
        subItems: [],
      },
      {
        title: "Cloud Accounting Systems",
        subItems: [],
      },
      {
        title: "Analytical Review & Process Optimization",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Associate Chartered Accountant (ACA)",
        subItems: [],
      },
      {
        title: "Bachelor of Commerce (B. Com)",
        subItems: [],
      },
      {
        title: "FAFD – Forensic Accounting & Fraud Detection (ICAI)",
        subItems: [],
      },
      {
        title: "Certified QuickBooks Bookkeeper",
        subItems: [],
      },
      {
        title: "Certified Xero Bookkeeper",
        subItems: [],
      },
    ],
    order: 19,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821431/asija-team/fbnc3cn7slibllypnmfq.jpg",
    email: "",
    linkedin: "https://www.linkedin.com/in/ca-aniket-gupta-8b230431b/",
    membership: "",
    mobile: "",
  },
  {
    name: "CA. Anand Prakash Srivastava",
    role: "Senior Consultant",
    description:
      "CA. Anand Prakash Srivastava is a seasoned finance professional with over 22 years of experience across industry and public practice. A Fellow Chartered Accountant (ICAI, India), CPA (Australia), and Associate Chartered Accountant (ICAEW, England), he has built a strong reputation for strategic governance, financial leadership, and mentoring.\nHis career includes 15+ years in senior finance roles across telecom and insurance and 7+ years in public practice, advising a diverse range of Indian and international clients. Known for his strategic acumen, governance depth, and technology-driven approach, he supports organizations in building resilient financial and operational frameworks.",
    experience: [
      {
        title: "Industry Leadership (Telecom & Insurance – 15+ years)",
        description: "",
        subItems: [
          "Held senior finance leadership positions at HDFC Life Insurance, Essar Telecom, Tata Teleservices, and Reliance Communications.",
          "Part of the core finance team for HDFC Life’s IPO (2017), leading zonal accounts across seven states and managing consolidation for the company’s Dubai subsidiary.",
          "Led compliance, governance, and finance operations across multiple geographies, ensuring efficiency, regulatory alignment, and business strategy execution.",
        ],
      },
      {
        title: "Public Practice & Advisory (7+ years)",
        description: "",
        subItems: [
          "Provides audit, assurance, and compliance services, including UN HACT assignments, systems audit, and corporate governance reviews.",
          "Offers specialized advisory in forensic accounting, financial planning, risk management, and knowledge process outsourcing (KPO).",
          "Advises corporates, institutions, and startups on financial structuring, compliance frameworks, and organizational governance.",
        ],
      },
    ],
    specialization: [
      {
        title: "Strategic Finance & Leadership",
        subItems: [],
      },
      {
        title: "Corporate Governance & Compliance",
        subItems: [],
      },
      {
        title: "Audit, Assurance & UN HACT Assignments",
        subItems: [],
      },
      {
        title: "Forensic Accounting & FAFD",
        subItems: [],
      },
      {
        title: "Risk Management & Regulatory Alignment",
        subItems: [],
      },
      {
        title: "Financial Planning & Wealth Management",
        subItems: [],
      },
      {
        title: "Ind-AS & Government Accounting",
        subItems: [],
      },
      {
        title: "Systems Audit & Technology-Enabled Processes",
        subItems: [],
      },
      {
        title: "KPO & Outsourced Financial Operations",
        subItems: [],
      },
      {
        title: "Mentoring, Team Leadership & Change Management",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Fellow Chartered Accountant (FCA) – ICAI, India",
        subItems: [],
      },
      {
        title: "Certified Public Accountant (CPA) – Australia",
        subItems: [],
      },
      {
        title: "Associate Chartered Accountant (ACA) – ICAEW, England",
        subItems: [],
      },
      {
        title: "FAFD (Forensic Accounting & Fraud Detection) – ICAI",
        subItems: [],
      },
      {
        title:
          "Certifications in Wealth Management, Government Accounting, and Ind-AS",
        subItems: [],
      },
      {
        title:
          "Executive Education: IIM Ahmedabad – Innovate, Disrupt & Change",
        subItems: [],
      },
      {
        title:
          "Executive Education: ISB Hyderabad – Analytical Thinking, Managerial Effectiveness & Leading in Times of Change",
        subItems: [],
      },
    ],
    order: 5,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821584/asija-team/ty4mktntvsbrcqdoxt5b.jpg",
    email: "",
    linkedin: "https://www.linkedin.com/in/anandpsrivastava/",
    membership: "",
    mobile: "",
  },
  {
    name: "CA Naeem Khan",
    role: "Consultant",
    description:
      "CA Naeem Khan is a practicing Chartered Accountant based in Lucknow with over four years of post-qualification experience in finance, taxation, audit, and commercial operations. Known for his analytical approach, precision, and commitment to client service, he supports organizations with robust tax, financial, and compliance solutions. His expanding international exposure positions him as a key contributor to the firm’s global initiatives.",
    experience: [
      {
        title: "Taxation & Litigation",
        description:
          "Specializes in Income Tax Litigation, representing clients before the Income Tax Appellate Tribunal (ITAT) and assisting with assessment, appeals, compliance, and advisory matters.",
        subItems: [],
      },
      {
        title: "Audit & Assurance",
        description:
          "Has managed statutory audits, internal audits, due diligence assignments, and finalization of accounts across a wide range of industries and business structures.",
        subItems: [],
      },
      {
        title: "Tax Compliance & Filings",
        description:
          "Experienced in GST and Income Tax return filings, ensuring accurate preparation, statutory compliance, and efficient execution of assignments.",
        subItems: [],
      },
      {
        title: "Corporate & Commercial Services",
        description:
          "Handles company registrations, accounting systems setup, and financial reporting for corporates, SMEs, and professionals.",
        subItems: [],
      },
      {
        title: "International Desk & Expansion Initiatives",
        description:
          "Currently spearheads the firm’s international expansion, with a dedicated focus on the UK Desk and cross-border service delivery.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Income Tax Litigation & ITAT Representation",
        subItems: [],
      },
      {
        title: "Direct & Indirect Tax Compliance",
        subItems: [],
      },
      {
        title: "GST Advisory & Filings",
        subItems: [],
      },
      {
        title: "Statutory, Internal & Tax Audits",
        subItems: [],
      },
      {
        title: "Due Diligence & Financial Reporting",
        subItems: [],
      },
      {
        title: "Company Registration & Corporate Compliance",
        subItems: [],
      },
      {
        title: "Cross-Border Advisory & International Desk Operations",
        subItems: [],
      },
      {
        title: "Analytical Review & Commercial Operations",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title: "Chartered Accountant (CA)",
        subItems: [],
      },
      {
        title: "Bachelor of Commerce (B. Com)",
        subItems: [],
      },
      {
        title: "FAFD – Forensic Accounting & Fraud Detection (ICAI)",
        subItems: [],
      },
      {
        title: "CPA (Ireland)",
        subItems: [],
      },
      {
        title: "CFA – Level II Candidate",
        subItems: [],
      },
    ],
    order: 17,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821412/asija-team/xxuluckq0ox0plhsbcpi.jpg",
    email: "",
    linkedin: "https://www.linkedin.com/in/ca-naeem-khan-a04402331/",
    membership: "",
    mobile: "",
  },
  {
    name: "CA. Ashish Kapoor",
    role: "Senior Partner",
    description:
      "CA. Ashish Kapoor is the Senior Partner at Asija & Associates LLP, a premier Chartered Accountancy firm with a legacy of over 39 years. With more than two decades of experience, he has played a pivotal role in advising organizations across diverse sectors including technology services, financial services, automotive, infrastructure, education, and manufacturing. Known for his strategic insight, analytical depth, and strong communication skills, he blends technical expertise with practical solutions to support sustainable business growth.",
    experience: [
      {
        title: "Senior Partner, Asija & Associates LLP",
        description:
          "Leads the firm’s taxation and advisory practice, guiding corporates, government bodies, and international institutions on complex regulatory and financial matters.",
        subItems: [],
      },
      {
        title: "Taxation & Litigation Specialist",
        description:
          "Extensive experience in Direct and Indirect Taxation, including Income Tax Litigation, GST advisory, and Benami Law.",
        subItems: [],
      },
      {
        title: "Regulatory & Compliance Advisor",
        description:
          "Advises FinTech and large enterprises on compliance frameworks, financial governance, and evolving regulatory landscapes.",
        subItems: [],
      },
      {
        title: "Representation Before Authorities",
        description:
          "Represents clients before the Income Tax Appellate Authority, Company Law Board, and appellate authorities under the PMLA and the Benami Transactions Act.",
        subItems: [],
      },
      {
        title: "Speaker & Trainer",
        description:
          "Frequently invited to speak at platforms such as ICAI, RBI, IIMs, NADT, NACIN, and leading corporates, delivering sessions on GST reforms, taxation of charitable trusts, litigation strategy, internal controls, and financial governance.",
        subItems: [],
      },
      {
        title: "Author & Thought Leader",
        description:
          "Regular contributor to professional publications and journals on tax reforms, compliance issues, governance standards, and emerging regulatory trends.",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Direct Taxation",
        subItems: [],
      },
      {
        title: "Indirect Taxation & GST",
        subItems: [],
      },
      {
        title: "Income Tax Litigation",
        subItems: [],
      },
      {
        title: "Benami Law & PMLA Advisory",
        subItems: [],
      },
      {
        title: "Financial Regulations & Compliance",
        subItems: [],
      },
      {
        title: "FinTech Advisory",
        subItems: [],
      },
      {
        title: "Internal Controls & Governance Frameworks",
        subItems: [],
      },
      {
        title: "Consulting & Litigation Strategy",
        subItems: [],
      },
      {
        title: "Corporate & Institutional Advisory",
        subItems: [],
      },
      {
        title: "Public Speaking & Training",
        subItems: [],
      },
      {
        title: "Technical Writing & Thought Leadership",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title:
          "Fellow Chartered Accountant (FCA) – Institute of Chartered Accountants of India",
        subItems: [],
      },
      {
        title: "Bachelor of Commerce (B. Com)",
        subItems: [],
      },
      {
        title: "Certified Concurrent Auditor of Bank",
        subItems: [],
      },
      {
        title: "Certified Peer Review Auditor",
        subItems: [],
      },
    ],
    order: 1,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765812168/asija-team/q10mki8j6paoxnwddjux.jpg",
    email: "ashish.kapoor@asija.in",
    linkedin: "https://www.linkedin.com/in/ca-ashish-kapoor/",
    membership: "",
    mobile: "+91-9559990001",
  },
  {
    name: "CA Ruchi Kapoor",
    role: "Senior Partner",
    description:
      "CA Ruchi Kapoor is a Senior Partner at Asija & Associates LLP, a legacy Chartered Accountancy firm with a distinguished history of 39 years. Beyond her professional pursuits, she is passionate about sports and community engagement, which led her to serve as the Chairperson of the Chartered Accountants Sports Association in 2024.",
    experience: [
      {
        title:
          "Senior Partner, Chief Finance Officer & Head of HR, Asija & Associates LLP",
        description: "",
        subItems: [
          "Plays a pivotal role in strategic decision-making, financial governance, and people management.",
          "Has over 19 years of experience in providing advisory services and leading organizational initiatives.",
        ],
      },
      {
        title: "Speaker & Trainer",
        description:
          "Delivered presentations and training sessions for government and educational institutions.",
        subItems: [
          "POSH Act for newly recruited Income Tax Officers",
          "Importance of Nomination & Financial Literacy for 1500+ staff and teachers of Lucknow Public School",
          "Multiple sessions for Income Tax Officers at NADT and other departmental forums",
        ],
      },
    ],
    specialization: [
      {
        title: "Financial strategy and advisory",
        subItems: [],
      },
      {
        title: "Leadership and people management",
        subItems: [],
      },
      {
        title: "Human resource management",
        subItems: [],
      },
      {
        title: "Public speaking and training",
        subItems: [],
      },
      {
        title: "Strategic planning and organizational governance",
        subItems: [],
      },
      {
        title: "Community engagement and sports leadership",
        subItems: [],
      },
    ],
    qualifications: [
      {
        title:
          "Chartered Accountant (CA), Institute of Chartered Accountants of India (ICAI)",
        subItems: [],
      },
    ],
    order: 1,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765812379/asija-team/ltqd03scm7kbojym7oof.jpg",
    email: "ruchi.kapoor@asija.in",
    linkedin: "https://www.linkedin.com/in/ruchi-kapoor-b6134915b/",
    membership: "",
    mobile: "+91-9559990002",
  },
  {
    name: "CA Sahil Dua",
    role: "Partner",
    qualifications: [
      {
        title: "FCA",
        subItems: [],
      },
      {
        title: "DISA",
        subItems: [],
      },
      {
        title: "B.Com",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Audit & Consulting",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Real Estate Sector",
        description:
          "He has an experience of almost 10 years in the Real Estate Sector. He has also been in Transaction Advisory for the real estate sector.",
        subItems: [],
      },
      {
        title: "Auditing & Assurance",
        description:
          "He has been in Auditing and Assurance for the last four years and has successfully handled various private clientele.",
        subItems: [],
      },
      {
        title: "Publications",
        description:
          "He has also been involved in various write-ups including articles on Budget for Lucknow Chartered Accountant’s Society.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "8081980032",
    email: "sahil.dua@asija.in",
    description:
      "He is an Associate Chartered Accountant and commerce graduate from the University of Lucknow. He has also completed a certification course on Information System Audit conducted by the Institute of Chartered Accountants of India. Presently, he is an integral part of our Audit and Assurance Vertical.",
    order: 9,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765813759/asija-team/iy19xdeky0adhv2odc8z.jpg",
    linkedin: "https://www.linkedin.com/in/ca-sahil-dua-56694aa3/",
  },
  {
    name: "CA Rohit Singh",
    role: "Partner",
    qualifications: [
      {
        title: "Fellow Chartered Accountant (FCA)",
        subItems: [],
      },
      {
        title: "Bachelor of Commerce (B. Com)",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Indirect Taxation",
        subItems: [],
      },
      {
        title: "Tax Litigation",
        subItems: [],
      },
      {
        title: "GST Advisory",
        subItems: [],
      },
      {
        title: "Management Consultancy",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Indirect Taxation Vertical",
        description:
          "Serving in the Indirect Taxation Vertical of Asija & Associates LLP since June 2015.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "+91-8808567624",
    email: "rohit.singh@asija.in",
    description:
      "CA Rohit Singh is a Fellow Chartered Accountant (FCA) and commerce graduate, associated with our firm since June 2015. Currently he is serving in Indirect Taxation Vertical of Asija & Associates LLP. His area of expertise includes Tax Litigation, GST and Management Consultancy.",
    order: 10,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765813782/asija-team/u3k1kbe0brkpvpr9npkp.jpg",
    linkedin: "https://www.linkedin.com/in/ca-rohit-singh/",
  },
  {
    name: "CA Mohammad Hassan Shuaib",
    role: "Consultant",
    qualifications: [
      {
        title: "Chartered Accountant (CA)",
        subItems: [],
      },
      {
        title: "DISA (ICAI)",
        subItems: [],
      },
      {
        title: "FAFD (Forensic Accounting & Fraud Detection)",
        subItems: [],
      },
      {
        title: "AICA (Level 1)",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Global Tax & Assurance",
        subItems: [],
      },
      {
        title: "Regulatory Compliance",
        subItems: [],
      },
      {
        title: "Tax Structuring",
        subItems: [],
      },
      {
        title: "UAE VAT & Corporate Tax",
        subItems: [],
      },
      {
        title: "Strategic Advisory",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Global Expansion Strategy",
        description:
          "Contributing to global tax and assurance expansion in UAE and Middle East Countries, bringing expertise in regulatory compliance, tax structuring, and strategic advisory across diverse jurisdictions.",
        subItems: [],
      },
      {
        title: "International Audit & Compliance",
        description:
          "Worked with PwC AC Kolkata on audit and compliance engagements for clients in the Cayman Islands, Bahamas, and Australia.",
        subItems: [],
      },
      {
        title: "UAE Taxation Consultancy",
        description:
          "Served as a Taxation Consultant in the UAE advising corporate clients on VAT and Corporate Tax.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "",
    email: "",
    description:
      "With his strong professional background and international exposure, CA Mohammad Hassan Shuaib contributes to our global tax and assurance expansion in UAE and Middle East Countries. His experience with PwC AC Kolkata and as a Taxation Consultant in the UAE strengthens the firm's global service capabilities.",
    order: 15,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765813859/asija-team/ux4nil3zfctyf2kazzhj.jpg",
    linkedin: "",
  },
  {
    name: "CA Pawan Chaurasiya",
    role: "Associate Director",
    qualifications: [
      {
        title: "Associate Chartered Accountant (ACA)",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Income Tax & TDS Compliance",
        subItems: [],
      },
      {
        title: "GST Filings & Advisory",
        subItems: [],
      },
      {
        title: "Statutory & Tax Audits",
        subItems: [],
      },
      {
        title: "Financial Reporting",
        subItems: [],
      },
      {
        title: "Forensic Examinations",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Taxation & Compliance",
        description:
          "Strong expertise in Income Tax and TDS compliance, GST filings, and tax audits.",
        subItems: [],
      },
      {
        title: "Audit & Assurance",
        description:
          "Statutory audits, financial statement preparation, and forensic reviews, ensuring accuracy, transparency, and strict adherence to regulatory requirements.",
        subItems: [],
      },
      {
        title: "Financial Analysis & Risk Assessment",
        description:
          "Analytical approach and keen attention to detail enable the identification of financial discrepancies, assessment of risks, and enhancement of financial integrity.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "",
    email: "",
    description:
      "An accomplished Associate Chartered Accountant with over 1.5 years of robust experience across taxation, auditing, accounting, financial reporting, and forensic examinations. Has successfully managed a diverse clientele, including corporate and non-corporate entities, delivering precise and compliant financial solutions.",
    order: 20,
    avatar:
      "https://res.cloudinary.com/do5lklzbn/image/upload/v1766308498/asija-team/vgbbgipnzjkbbhnz4krt.jpg",
    linkedin: "",
  },
  {
    name: "CA Kamal Kumar Ferwani",
    role: "Senior Partner",
    qualifications: [
      {
        title: "B. Com",
        subItems: [],
      },
      {
        title: "FCA (Fellow Chartered Accountant)",
        subItems: [],
      },
      {
        title: "DISA (ICAI) - Diploma in Information System Audit",
        subItems: [],
      },
      {
        title: "FAFD (Forensic Accounting & Fraud Detection)",
        subItems: [],
      },
      {
        title: "CCCA (Certified Concurrent Auditor of Bank)",
        subItems: [],
      },
      {
        title: "BRSR (Business Responsibility and Sustainability Reporting)",
        subItems: [],
      },
      {
        title: "Certified Course of Public Finance & Government Accounting",
        subItems: [],
      },
      {
        title: "Certified Peer Reviewer",
        subItems: [],
      },
      {
        title: "Certified Course of IND-AS",
        subItems: [],
      },
      {
        title: "Certified Course of Derivatives",
        subItems: [],
      },
      {
        title: "Certified Course of Insolvency and Bankruptcy Code",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Audit Wing (Govt. & Banking Sector)",
        subItems: [],
      },
      {
        title: "Financial Consultancy",
        subItems: [],
      },
      {
        title: "Project Financing & Reports",
        subItems: [],
      },
      {
        title: "Corporate Finance Liaison",
        subItems: [],
      },
      {
        title: "Taxation Laws",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Professional Journey",
        description:
          "Mr. Kamal Kumar Ferwani is the Senior Partner of the firm and has more than 20 years of experience in the specialized fields of Auditing of Government Entities and Private Clientele. He started his career in 2004 by joining Asija & Associates and became FCA in the year 2009.",
        subItems: [],
      },
      {
        title: "Core Expertise",
        description:
          "Since over a decade, Mr. Kamal has obtained good experience in almost every field such as taxation laws, auditing, corporate finance liaison etc. He handles various issues with equal ease with his core expertise lies in financial consultancy. He has mastered the art of project reports, project financing, and other legal compliances.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "+91-9559990003",
    email: "kamal.ferwani@asija.in",
    description:
      "Mr. Kamal Kumar Ferwani is the Senior Partner of the firm and has more than 20 years of experience in the specialized fields of Auditing of Government Entities and Private Clientele. His core skills lie in understanding client’s requirements & transforming them into satisfying results.",
    order: 2,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821303/asija-team/yayzezpidu7dftzy3hpq.jpg",
    linkedin: "https://www.linkedin.com/in/cakamalferwani/",
  },
  {
    name: "CA Akash Agarwal",
    role: "Partner",
    qualifications: [
      {
        title: "ACA (Associate Chartered Accountant)",
        subItems: [],
      },
      {
        title: "LL.B",
        subItems: [],
      },
      {
        title: "B.Com",
        subItems: [],
      },
    ],
    specialization: [
      {
        title: "Direct Taxation",
        subItems: [],
      },
      {
        title: "Indirect Taxation",
        subItems: [],
      },
      {
        title: "Tax Litigation",
        subItems: [],
      },
      {
        title: "Business Consultancy",
        subItems: [],
      },
    ],
    experience: [
      {
        title: "Direct Taxation Vertical",
        description:
          "Associated with the firm since June 2019. Currently serving in the Direct Taxation Vertical of Asija & Associates LLP.",
        subItems: [],
      },
      {
        title: "Core Expertise",
        description:
          "His area of expertise includes Tax Litigation in Direct Tax Matters and Business Consultancy related to Taxation matters and compliances.",
        subItems: [],
      },
    ],
    membership: "",
    associationYears: "",
    mobile: "+91-9582462284",
    email: "akash.agarwal@asija.in",
    description:
      "CA Akash Agarwal is an Associate Chartered Accountant (ACA) and commerce graduate, associated with our firm since June 2019. Currently, he is serving in Direct Taxation Vertical of Asija & Associates LLP. His area of expertise includes Tax Litigation in Direct Tax Matters and Business Consultancy related to Taxation matters and compliances.",
    order: 11,
    avatar:
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1765821689/asija-team/zsxxof1wkck2nw6tjuw1.jpg",
    linkedin: "https://www.linkedin.com/in/ca-akashagarwal/",
  },
];

async function seedTeam() {
  try {
    console.log("Starting to add founder...");

    // Check if founder already exists
    const existingFounder = await Team.findOne({
      name: "CA Uttam Chandra Asija",
    });
    if (existingFounder) {
      console.log("Founder already exists, skipping...");
      return;
    }

    // Add founder
    const founder = {
      name: "CA Uttam Chandra Asija",
      role: "Founder Sr. Partner",
      description:
        "CA. U.C. Asija is a Fellow Chartered Accountant and is the founder partner of Asija & Associates. He has been providing professional services since 1986 in various corporate sectors like Sugar & Paper Industry etc. His professional interests spread over spheres and across several industries. He has a vast and enriching experience in working with multinational organizations for over eighteen years. He has been a part of organizations like Firestone Tire & Rubber Company of India Private Limited (An American Company) & Modi Stone Limited. He specializes in the field of Audit & Consultancy of private and corporate entities and heads the 'Audit Wing – Private & Corporate Sector' of our Firm. His other area of expertise includes Statutory Audits of Banks, Society and Trust Registration and their Income Tax aspects. He is in charge of overall Quality Control Policy of the firm. He is also empanelled as reviewer by peer review board of ICAI.",
      experience: [
        {
          title: "Professional Journey",
          description:
            "Started career in 2004, became FCA in 2009. Over 20 years in auditing government entities and private clientele.",
          subItems: [],
        },
        {
          title: "Core Expertise",
          description:
            "Specializes in taxation laws, auditing, corporate finance liaison. Masters project reports, project financing, and legal compliances.",
          subItems: [],
        },
      ],
      specialization: [
        {
          title: "Audit Wing (Govt. & Banking Sector)",
          subItems: [],
        },
        {
          title: "Financial Consultancy",
          subItems: [],
        },
        {
          title: "Project Financing & Reports",
          subItems: [],
        },
        {
          title: "Corporate Finance Liaison",
          subItems: [],
        },
        {
          title: "Taxation Laws",
          subItems: [],
        },
      ],
      qualifications: [
        {
          title: "B. Com",
          subItems: [],
        },
        {
          title: "FCA (Fellow Chartered Accountant)",
          subItems: [],
        },
        {
          title: "DISA (ICAI) - Diploma in Information System Audit",
          subItems: [],
        },
        {
          title: "FAFD (Forensic Accounting & Fraud Detection)",
          subItems: [],
        },
        {
          title: "CCCA (Certified Concurrent Auditor of Bank)",
          subItems: [],
        },
        {
          title: "BRSR (Business Responsibility and Sustainability Reporting)",
          subItems: [],
        },
        {
          title: "Certified Course of Public Finance & Government Accounting",
          subItems: [],
        },
        {
          title: "Certified Peer Reviewer",
          subItems: [],
        },
        {
          title: "Certified Course of IND-AS",
          subItems: [],
        },
        {
          title: "Certified Course of Derivatives",
          subItems: [],
        },
        {
          title: "Certified Course of Insolvency and Bankruptcy Code",
          subItems: [],
        },
      ],
      order: 1,
      avatar: "",
      email: "admin@asija.in",
      linkedin: "",
      membership: "",
      mobile: "+91-9450363309",
      associationYears: "39 Years",
    };

    const insertedFounder = await Team.create(founder);
    console.log(`Successfully added founder: ${insertedFounder.name}`);
  } catch (error) {
    console.error("Error adding founder:", error);
  }
}

// Run the seeding function
async function main() {
  await connectDB();
  await seedTeam();
  console.log("Seeding completed!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
