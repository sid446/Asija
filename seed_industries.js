const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
  process.exit(1);
}

const IndustrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Industry =
  mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);

const industries = [
  {
    title: "Banking and Financial Institutions",
    description:
      "End-to-end audit, tax planning, and compliance for banks, NBFCs, and fintech startups.",
    details:
      "Our Banking & Finance services cover statutory audits, concurrent audits, and stock audits for major nationalized and private banks. We specialize in NPA management, credit monitoring, and regulatory compliance with RBI norms. For fintech startups, we offer valuation services, funding advisory, and structuring of cross-border transactions.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Education",
    description:
      "Financial advisory for schools, universities, and edtech platforms with grant compliance.",
    details:
      "We assist educational institutions in managing their finances efficiently, ensuring compliance with UGC, AICTE, and other regulatory bodies. Our services include internal audits, fee structuring, grant utilization audits, and tax exemptions for non-profit educational trusts. For EdTech companies, we provide valuation, due diligence, and investor reporting services.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Hospitality and Healthcare",
    description:
      "Hospital accounting, medical billing, and regulatory compliance under NABH & HIPAA.",
    details:
      "Our healthcare financial services are tailored for hospitals, clinics, and pharmaceutical companies. We handle revenue cycle management, cost audits, and tax planning. We ensure compliance with NABH financial standards and provide advisory on mergers and acquisitions in the healthcare sector.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Infrastructure",
    description:
      "Project finance, PPP models, and cost audits for roads, metro, and smart cities.",
    details:
      "We support infrastructure developers with project feasibility studies, financial modeling, and debt syndication. Our expertise covers PPP (Public-Private Partnership) models, cost audits, and compliance with RERA and other real estate regulations. We also provide advisory on tax incentives for infrastructure projects.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Media and Entertainment",
    description:
      "Financial management, royalty audits, and tax incentives for production houses and media agencies.",
    details:
      "We provide specialized financial services for the media and entertainment industry, including production accounting, royalty audits, and tax credit optimization. We help production houses and agencies manage their budgets, ensure compliance with industry regulations, and maximize profitability.",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
  },
  {
    title: "Realty Sector",
    description:
      "RERA compliance, project funding, and valuation for developers and REITs.",
    details:
      "From residential to commercial real estate, we offer comprehensive financial solutions including RERA registration and compliance, GST impact analysis, and project funding assistance. We also specialize in valuation services for REITs (Real Estate Investment Trusts) and joint venture structuring.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Retail, White Goods & Consumer Electronics",
    description:
      "Inventory management, GST compliance, and supply chain finance for retail chains and consumer brands.",
    details:
      "We help retail and consumer electronics businesses optimize their inventory management, ensure GST compliance, and improve supply chain finance. Our services include internal audits, risk assessment, and financial planning to support growth and expansion in a competitive market.",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Telecom",
    description:
      "Revenue assurance, spectrum usage audits, and regulatory compliance for telecom operators.",
    details:
      "Our telecom services focus on revenue assurance, spectrum usage audits, and compliance with TRAI regulations. We assist telecom operators in managing their financial operations, optimizing costs, and navigating the complex regulatory landscape of the telecommunications industry.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Textiles",
    description:
      "Cost audits, export incentives, and financial restructuring for textile manufacturers.",
    details:
      "We provide specialized financial services for the textile industry, including cost audits, management of export incentives, and financial restructuring. We help textile manufacturers improve their operational efficiency, manage risks, and ensure compliance with government regulations.",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
  },
  {
    title: "Trading",
    description:
      "Trade finance, forex management, and customs compliance for import-export businesses.",
    details:
      "Our services for trading businesses include trade finance advisory, forex management, and customs compliance. We help importers and exporters navigate international trade regulations, manage currency risks, and optimize their working capital.",
    image:
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?q=80&w=2071&auto=format&fit=crop",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("Connected to MongoDB");

    console.log("Clearing existing industries...");
    await Industry.deleteMany({});
    console.log("Cleared existing industries");

    const industriesWithOrder = industries.map((ind, index) => ({
      ...ind,
      order: index,
    }));

    console.log("Inserting new industries...");
    await Industry.insertMany(industriesWithOrder);
    console.log(`Seeded ${industries.length} industries`);

    console.log("Disconnecting...");
    await mongoose.disconnect();
    console.log("Done");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
