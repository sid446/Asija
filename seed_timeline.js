const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
  process.exit(1);
}

const AboutTimelineSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AboutTimeline =
  mongoose.models.AboutTimeline ||
  mongoose.model("AboutTimeline", AboutTimelineSchema);

const timelineData = [
  {
    year: "1986 – The Beginning of a Legacy",
    heading: "Foundation by CA Uttam Chand Asija",
    description:
      "The foundation of our firm was laid on 01 April 1986 by our visionary Founding Partner, CA Uttam Chand Asija. With a strong belief in ethical practice and professional discipline, he began the journey as a sole practitioner. His unwavering dedication, deep technical knowledge, and client-centric approach shaped the culture and values that continue to guide our firm even today.",
    images: [
      "https://images.unsplash.com/photo-1624357676666-4cca3b657627?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1680261019762-59d8fa84e0a3?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    order: 1,
  },
  {
    year: "2004 – Transition into a Partnership Structure",
    heading: "Expanding Leadership",
    description:
      "After nearly two decades of consistent growth and expanding clientele, the firm transitioned into a partnership structure in 2004 with four partners. This shift strengthened leadership capabilities, diversified expertise, and prepared the firm for future expansion.",
    images: [
      "https://plus.unsplash.com/premium_photo-1664392124762-db2317f99f84?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    ],
    order: 2,
  },
  {
    year: "2014 – Recognition by C&AG",
    heading: "Major Auditor Panel",
    description:
      "A prestigious milestone was achieved in 2014, when Asija & Associates LLP was placed on the Major Auditor Panel created by the Office of the Comptroller & Auditor General (C&AG) of India. This recognition reaffirmed our professional credentials and enabled us to undertake large-scale statutory audits of government bodies and public sector enterprises.",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop",
    ],
    order: 3,
  },
  {
    year: "2016 – Evolution into a Limited Liability Partnership (LLP)",
    heading: "Modern Governance",
    description:
      "In 2016, the firm adopted a modern governance structure by converting into a Limited Liability Partnership (LLP). This strengthened risk management, improved operational flexibility, and enabled the firm to manage larger, more complex assignments.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop",
    ],
    order: 4,
  },
  {
    year: "2017 – First Expansion Outside Uttar Pradesh",
    heading: "Bengaluru Branch",
    description:
      "A historic milestone was achieved in 2017 when we opened our first branch outside Uttar Pradesh in Bengaluru. This expansion marked our entry into South India—one of the country’s most dynamic business ecosystems. Establishing the Bengaluru branch demonstrated our readiness to serve a wider client base and paved the way for national-level operations.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=600&fit=crop",
    ],
    order: 5,
  },
  {
    year: "2018 – Expansion to the National Capital Region",
    heading: "New Delhi Branch",
    description:
      "In 2018, the firm strengthened its presence in North India by opening a new branch in New Delhi. This expansion enhanced our accessibility to major corporate hubs, government institutions, and regulatory bodies, enabling us to cater to a broader range of industries with greater efficiency.",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=600&fit=crop",
    ],
    order: 6,
  },
  {
    year: "2021 – Multi-State Growth Across India",
    heading: "Pan-India Presence",
    description:
      "The year 2021 was a landmark period of accelerated expansion. Our firm entered three additional states, establishing branches in Mumbai (Maharashtra), Dehradun (Uttarakhand), and Guwahati (Assam). This multi-state presence elevated the firm into a truly pan-India professional services network.",
    images: [
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
    ],
    order: 7,
  },
  {
    year: "2022 – A Stronger Leadership: 10 Partners",
    heading: "Expanded Leadership",
    description:
      "In 2022, the firm expanded its leadership team to 10 partners, each specializing in diverse service areas such as audit, taxation, advisory, compliance, finance, and system reviews. This strengthened governance framework empowered the firm to undertake large-scale, complex assignments with enhanced quality, oversight, and strategic depth.",
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop",
    ],
    order: 8,
  },
  {
    year: "2024 – Global Recognition & Expansion",
    heading: "UN Empanelment & North-East Growth",
    description:
      "In 2024, we expanded further in the North-East region with an additional branch, reinforcing our commitment to serving emerging markets. A landmark international achievement was unlocked in 2024, when Asija & Associates LLP was formally empanelled by the United Nations for assignments across South Asia. This global accreditation positioned the firm on an international platform and opened avenues for development-sector engagements worldwide.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop",
    ],
    order: 9,
  },
  {
    year: "2025 – First International Assignment Executed",
    heading: "Global Professional Services",
    description:
      "In 2025, we proudly completed our first international assignment in collaboration with UN agencies, marking our entry into the global professional services space. This milestone reflects the firm’s capability, credibility, and readiness to deliver at global standards.",
    images: [
      "https://images.unsplash.com/photo-1704655295066-681e61ecca6b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=600&fit=crop",
    ],
    order: 10,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await AboutTimeline.deleteMany({});
    console.log("Cleared existing timeline data");

    await AboutTimeline.insertMany(timelineData);
    console.log("Seeded timeline data successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
