const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sidhantsingh446:sidbrogo123@cluster0.jvg4v.mongodb.net/asija?retryWrites=true&w=majority&appName=Cluster0";

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

async function addIreland() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const ireland = {
      name: "Ireland",
      slug: "ireland",
      image:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2089&auto=format&fit=crop",
      href: "/global-services/ireland",
      order: 6, // Adjust order as needed
    };

    const existing = await GlobalRegion.findOne({ slug: "ireland" });
    if (existing) {
      console.log("Ireland already exists");
    } else {
      await GlobalRegion.create(ireland);
      console.log("Ireland added successfully");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

addIreland();
