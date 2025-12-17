const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable");
  process.exit(1);
}

const GlobalRegionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    heroImage: { type: String },
    heroTitle: { type: String },
    heroDescription: { type: String },
    contentHeading: { type: String },
    contentDescription: { type: String },
    features: [{ type: String }],
  },
  { timestamps: true, strict: false }
);

const GlobalRegion =
  mongoose.models.GlobalRegion ||
  mongoose.model("GlobalRegion", GlobalRegionSchema);

async function updateIrelandContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const irelandContent = {
      heroImage:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2089&auto=format&fit=crop",
      heroTitle: "Ireland: A Hub for Global Business",
      heroDescription:
        "Strategic solutions for one of Europe's most dynamic economies. We help businesses navigate the Irish market with precision and expertise.",
      contentHeading: "Comprehensive Services in Ireland",
      contentDescription:
        "From Dublin to Cork, our team provides tailored financial, legal, and technological services designed to meet the unique regulatory and business requirements of Ireland.",
      features: [
        "Company Formation & Secretarial Services",
        "Tax Compliance & Advisory",
        "Financial Reporting & Auditing",
        "Regulatory Compliance (CRO)",
        "Business Process Outsourcing",
      ],
    };

    const result = await GlobalRegion.updateOne(
      { slug: "ireland" },
      { $set: irelandContent }
    );

    if (result.matchedCount === 0) {
      console.log("Ireland region not found. Please run the add script first.");
    } else {
      console.log("Ireland content updated successfully.");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

updateIrelandContent();
