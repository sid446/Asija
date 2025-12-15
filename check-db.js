const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sid446:Sid%409896@cluster0.f14c9.mongodb.net/asija?retryWrites=true&w=majority&appName=Cluster0";

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
  },
  { timestamps: true }
);

const GlobalRegion =
  mongoose.models.GlobalRegion ||
  mongoose.model("GlobalRegion", GlobalRegionSchema);

async function checkRegions() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const count = await GlobalRegion.countDocuments();
    console.log(`GlobalRegion count: ${count}`);

    const regions = await GlobalRegion.find({});
    console.log("Regions:", JSON.stringify(regions, null, 2));

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

checkRegions();
