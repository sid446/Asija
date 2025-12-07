const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
  process.exit(1);
}

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    translationKey: { type: String, required: true },
    items: [{ type: String }],
    insights: { type: Boolean, default: false },
    imgSrc: { type: String },
    description: { type: String },
    detailedDescription: { type: String },
    benefits: [{ type: String }],
    subItems: { type: mongoose.Schema.Types.Mixed, default: {} },
    deepSubItems: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const services = [
  {
    title: "Audit and Assurance",
    translationKey: "services.auditAssurance",
    items: [
      "Statutory Audit",
      "Internal Audit",
      "Procurement Audit",
      "Special Audit",
      "Fund Audit",
      "Externally Funded Project Audit",
      "Management Audit",
    ],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop",
    description:
      "Comprehensive audit solutions ensuring compliance, transparency, and financial accuracy across all business operations.",
    detailedDescription:
      "Our Audit and Assurance services provide comprehensive solutions designed to ensure compliance, transparency, and financial accuracy across diverse sectors including government, PSUs, and private enterprises.",
    benefits: [
      "Enhanced financial credibility and stakeholder confidence",
      "Identification of operational inefficiencies and risk areas",
      "Compliance with regulatory requirements and industry standards",
      "Improved internal controls and governance frameworks",
      "Strategic insights for business improvement",
    ],
    subItems: {
      "Statutory Audit": [
        "Assessment of Internal Control and Auditing of Accounts",
        "Accounting Standard Compliances",
        "Companies Act Compliances",
        "IFRS Compliances",
        "IGAAP Compliances",
        "True & Fair Opinion Assurance",
      ],
      "Internal Audit": [
        "Monitor Operating Results",
        "Verify Financial Records",
        "Evaluate Internal Controls",
        "Assist with increasing efficiency and effectiveness of operations",
        "Fraud Detection",
      ],
      "Procurement Audit": [
        "Tender Process Review",
        "Vendor Evaluation and Selection Review",
        "Purchase Order Review",
        "Internal Process Review",
      ],
      "Special Audit": [
        "Audit against Rules & Orders",
        "Audit of Sanctions",
        "Audit against provision of fraud",
        "Propriety Audit",
        "Performance Audit",
      ],
      "Fund Audit": [
        "Grant or Program Audit",
        "Compliance with applicable legislation",
        "Compliance with applicable Accounting Standard",
      ],
      "Externally Funded Project Audit": [
        "Review of Project Disbursement",
        "Review of Documentation",
        "Review of Project Financial Report",
        "Review of Management Structure",
        "Review of Project Monitoring and Evaluation",
      ],
      "Management Audit": [
        "Assessment of methods and policies of organizations' management",
        "Identification of weakness of system and management",
        "Suggestions for Improvements",
      ],
    },
    deepSubItems: {},
  },
  {
    title: "Direct Tax",
    translationKey: "services.directTax",
    items: ["Income Tax Services", "Benami Transaction"],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1470&auto=format&fit=crop",
    description:
      "Expert guidance on income tax planning, compliance, and representation in complex tax matters.",
    detailedDescription:
      "The Direct Tax Vertical of Asija & Associates LLP has a professional reputation built on trust, expertise, and successful outcomes in litigation and compliance.",
    benefits: [
      "Minimized tax liability through strategic planning",
      "Expert representation before tax authorities",
      "Timely compliance with filing and payment obligations",
      "Risk mitigation in complex tax matters",
      "Peace of mind with professional tax management",
    ],
    subItems: {
      "Income Tax Services": [
        "Compliance Support Services",
        "Registrations, Certifications & Approvals",
        "Advisory Services",
        "Representations",
      ],
      "Benami Transaction": ["Advisory Services", "Representations"],
    },
    deepSubItems: {
      "Direct Tax": {
        "Income Tax Services": {
          "Compliance Support Services": [
            "PAN / TAN registrations",
            "Filing of Income Tax Returns",
            "TDS / TCS Compliance & e-Return Filing",
            "Advance Tax Calculation & Tax Deposition",
            "e-Filing of Form 15CA & Form 15CB",
            "e-Filing of Audit report and other digital documents and forms",
          ],
          "Registrations, Certifications & Approvals": [
            "12AA(1)(b), 80G(5)(vi), 10(23C)(vi) from Commissioner of Income Tax (Exemption)",
            "Approval u/s 17(2)(ii)(b) for specialized hospitals",
            "Certificate u/s 197 (Lower/Nil TDS)",
            "Certificate u/s 206C(9) for Lower/Nil TCS",
            "Certification u/s 195(2) & 195(3) for International Transactions",
          ],
          "Advisory Services": [
            "International and Domestic Tax Planning",
            "Assistance in availing benefits, exemptions, relief, rebates and deductions",
            "Innovative tax minimization strategies with risk mitigation",
          ],
          Representations: [
            "Scrutiny Assessments before Assessing Officer",
            "Revision of Orders before Principal Commissioner",
            "Appeals before CIT(A)",
            "Representation before ITAT",
            "Before Director General of Income Tax (Investigation)",
          ],
        },
        "Benami Transaction": {
          "Advisory Services": [
            "Transaction Advisory on potential Benami transactions",
            "Guidance during enquiry by Initiating Officer",
          ],
          Representations: [
            "Before Initiating Officer (AC/DC)",
            "Before Approving Authority (Addl./Jt. Commissioner)",
            "Before Administrator",
            "Before Adjudicating Authority",
            "Before Appellate Tribunal",
          ],
        },
      },
    },
  },
  {
    title: "Corporate Law Services",
    translationKey: "services.corporateLaw",
    items: [
      "Companies Act 2013",
      "Limited Liability Partnership Act 2008",
      "Partnership Act 1932",
      "NGO Registration & Consultancy",
      "Foreign Contribution Regulation Act 2010",
      "Assurance Services",
      "Other Services",
    ],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop",
    description:
      "End-to-end corporate legal compliance and advisory services for businesses of all sizes.",
    detailedDescription:
      "Our Corporate Law Services provide comprehensive support for businesses navigating India's complex regulatory landscape — from incorporation to compliance and beyond.",
    benefits: [
      "Seamless entity formation and structuring",
      "Ongoing compliance management",
      "Risk mitigation through proper governance",
      "Expert advisory on regulatory matters",
      "Cost-effective compliance solutions",
    ],
    subItems: {
      "Companies Act 2013": [
        "Incorporation of Private/ Public / OPC",
        "Annual Filing of Companies",
        "Company Law Compliances",
        "CSR Compliances",
        "Conversion of entities into Part I – Company",
        "Advisory & Retainership",
        "Secretarial Compliances",
        "Strike Off / Winding Up",
      ],
      "Limited Liability Partnership Act 2008": [
        "Incorporation of LLP",
        "Conversion of entities (Partnership firms and companies) into LLP",
        "Annual Filing of LLPs",
        "Secretarial Compliances",
        "Specialized Drafting of LLP Agreement",
        "Strike off / Winding Up",
        "Advisory Services related to LLP Act",
      ],
      "Partnership Act 1932": [
        "Drafting of Partnership Agreement",
        "Registration of Partnership Firms",
        "Partnership Act Compliances",
        "Conversion of Firms into LLP/ Company",
      ],
      "NGO Registration & Consultancy": [
        "Registration of Charitable Trusts",
        "Registration / Renewal of Society",
        "Incorporation of Section-8 Company",
        "Drafting of Memorandum/ Bye laws of Society",
        "Drafting of Trust Deed",
        "Compliances under Societies Act",
        "Advisory related to NGOs",
      ],
      "Foreign Contribution Regulation Act 2010": [
        "Registration/ Prior Permission from Ministry of Home Affairs",
        "Annual Return Filing",
        "FCRA Compliances",
        "Advisory related to Foreign Remittance",
      ],
      "Assurance Services": [
        "Secretarial Audit",
        "Compliance Audit of Entities on Retainership Basis",
        "Search Report",
        "Due Diligence Report",
      ],
      "Other Services": [
        "Legal Drafting (Agreements, Contract Vetting)",
        "Intellectual Property Right (Trademark, Copyright)",
        "AOP/BOI/ HUF Formation",
        "Importer Exporter Code",
        "Issuance of Digital Signature Certificate",
        "Dematerialization",
      ],
    },
    deepSubItems: {},
  },
  {
    title: "Banking & Finance",
    translationKey: "services.bankingFinance",
    items: ["Banking", "Finance"],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1551&auto=format&fit=crop",
    description:
      "Specialized audit and financing solutions for banks and financial institutions.",
    detailedDescription:
      "We provide specialized services to banking and financial institutions with deep domain expertise in regulatory compliance, risk management, and financing solutions.",
    benefits: [
      "Regulatory compliance assurance",
      "Enhanced risk management in lending",
      "Optimized financing structures",
      "Improved audit quality and reporting",
      "Stronger governance and controls",
    ],
    subItems: {
      Banking: [
        "Statutory Audit",
        "Concurrent Audit",
        "Revenue Audit",
        "Information System Audit",
        "Stock Audit",
      ],
      Finance: [
        "Project Financing",
        "Working Capital Finance",
        "Corporate Lending",
      ],
    },
    deepSubItems: {},
  },
  {
    title: "Consultancy",
    translationKey: "services.consultancy",
    items: [
      "Process Re-Engineering",
      "Start-up Consultancy",
      "Business Advisory",
      "MIS System Designing",
    ],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
    description:
      "Strategic business consulting to optimize operations, drive growth, and achieve your vision.",
    detailedDescription:
      "Our Consultancy services help businesses optimize their operations, implement best practices, and achieve sustainable growth through data-driven insights.",
    benefits: [
      "Improved operational efficiency and productivity",
      "Data-driven decision making capabilities",
      "Strategic clarity and direction",
      "Accelerated business growth",
      "Risk-aware business development",
    ],
    subItems: {
      "Process Re-Engineering": [
        "Suggesting the best practices",
        "Identifying Performance gaps by comparing current processes with best practices",
        "Training of employees of entity for new changes to be made",
        "Review and Monitoring of implemented processes",
        "Capacity Building",
      ],
      "Start-up Consultancy": [
        "Certifications and special licenses assistance",
        "Analysis of market and competitors",
        "Consultancy and Advisory Services",
        "Process Mapping & assisting",
        "Review and monitoring on continuous basis",
      ],
      "Business Advisory": [
        "IT risk and Assurance",
        "Process Audit and controls",
        "Risk Management",
        "Finance Management Consulting",
        "Supply Chain and Customer Management Services",
      ],
      "MIS System Designing": [
        "Accounting Information and System Design",
        "Transaction Processing Systems",
        "Budgetary controls and designs",
        "IT system design and consultancy",
      ],
    },
    deepSubItems: {},
  },
  {
    title: "Indirect Tax",
    translationKey: "services.indirectTax",
    items: [
      "Goods and Service Tax",
      "Custom Duty",
      "Professional Tax",
      "GST Compliance",
      "GST Advisory",
      "GST Litigation",
    ],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1515&auto=format&fit=crop",
    description:
      "GST and indirect tax solutions ensuring seamless compliance and optimal tax efficiency.",
    detailedDescription:
      "Our Indirect Tax services provide comprehensive solutions from registration to litigation, ensuring full compliance and maximum input credit utilization.",
    benefits: [
      "Optimized GST liability and cash flow",
      "Seamless compliance with GST regulations",
      "Expert representation in litigation matters",
      "Minimized risk of penalties and interest",
      "Strategic guidance on indirect tax planning",
    ],
    subItems: {
      "Goods and Service Tax": [
        "Tax Advisory (Applicability / Rates defined)",
        "Registration",
        "Transition / Conversion from Old Laws (VAT, Service Tax, Excise & VAT to GST)",
        "Return Filing (Monthly / Annually)",
        "GST Compliance Management",
        "Input Tax Credit Optimization",
        "GST Audit & Health Check",
      ],
    },
    deepSubItems: {},
  },
  {
    title: "Risk Advisory Services",
    translationKey: "services.riskAdvisory",
    items: [
      "Enterprise Risk Management",
      "Internal Controls Assessment",
      "Fraud Risk Management",
      "Compliance Risk Advisory",
      "Business Continuity Planning",
      "Cybersecurity Risk Assessment",
    ],
    insights: true,
    imgSrc:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop",
    description:
      "Proactive risk identification and mitigation strategies to protect your business interests.",
    detailedDescription:
      "Our Risk Advisory Services help organizations identify, assess, and mitigate risks before they become threats — ensuring resilience and sustainability.",
    benefits: [
      "Proactive identification and mitigation of key risks",
      "Strengthened internal control environment",
      "Reduced likelihood of fraud and financial losses",
      "Enhanced regulatory compliance",
      "Improved business resilience and continuity",
    ],
    subItems: {},
    deepSubItems: {},
  },
];

async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Service.deleteMany({});
    console.log("Cleared existing services");

    await Service.insertMany(services);
    console.log("Seeded services successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
}

seedServices();
