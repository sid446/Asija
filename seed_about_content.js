const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
  process.exit(1);
}

const AboutContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    quote: { type: String, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: true },
    description3: { type: String, required: true },
    description4: { type: String, default: "" },
  },
  { timestamps: true }
);

const AboutContent =
  mongoose.models.AboutContent ||
  mongoose.model("AboutContent", AboutContentSchema);

const contentData = {
  title: "Our Story",
  quote:
    "Coming together is a beginning, keeping together is progress Working together is success",
  description1:
    "Asija & Associates LLP, Chartered Accountants was established on 1st April 1986 by our founder member CA. Uttam Chandra Asija with the aim of providing a wide range of Accounting and Financial services to clients in Government, Corporate & Private Sector. Over the years the firm has been built around a team of professionals, possessing vast experience in the areas of auditing, accounting, taxation, company law matters, along with a host of other financial services which are rendered to the clients to turning complex problems into growth opportunities and supporting the progress of society at large.",
  description2:
    "Our Firm has not only grown tremendously in knowledge and expertise but has also created history by becoming the first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership (LLP) – a landmark achievement that reflects our progressive vision and commitment to excellence.",
  description3:
    "Today, with decades of trust earned and hundreds of success stories written, we continue to stand by our core belief: delivering exceptional quality to every stakeholder and going above and beyond client expectations through collaboration, innovation, and unwavering integrity.",
  description4: "",
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await AboutContent.deleteMany({});
    console.log("Cleared existing content data");

    await AboutContent.create(contentData);
    console.log("Seeded about content data successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
