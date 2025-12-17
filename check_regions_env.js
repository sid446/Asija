const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" }); // Load from .env

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable");
  process.exit(1);
}

console.log("Using URI:", MONGODB_URI);

const GlobalRegionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, strict: false } // strict: false to allow other fields
);

const GlobalRegion =
  mongoose.models.GlobalRegion ||
  mongoose.model("GlobalRegion", GlobalRegionSchema);

async function checkRegions() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const regions = await GlobalRegion.find({}, "name slug");
    console.log(
      "Regions found:",
      regions.map((r) => r.name)
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

checkRegions();
