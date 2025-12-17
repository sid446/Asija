const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const LocationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    phones: { type: [String], default: [] },
    email: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    googleMapsUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

const locations = [
  {
    label: "Head Office - Lucknow",
    title: "HEAD OFFICE",
    address: "1st floor, 34/5 Gokhale Marg, Lucknow, U.P. (India) – 226001",
    phones: ["0522-4004652", "0522-2205072"],
    email: "admin@asija.in",
    lat: 26.8542,
    lng: 80.9442,
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Asija+Associates+Lucknow+Gokhale+Marg",
  },
  {
    label: "Branch Office - Bengaluru",
    title: "BRANCH OFFICE - BENGALURU",
    address:
      "B-1203 Mantri Greens Apartment, Next to Mantri Square Mall, Malleshwaram, Bengaluru 560003",
    phones: ["+91-8860082758"],
    email: "admin@asija.in",
    lat: 12.9915,
    lng: 77.5702,
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mantri+Greens+Apartment+Bengaluru",
  },
];

async function seedLocations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Location.deleteMany({});
    console.log("Cleared existing locations");

    await Location.insertMany(locations);
    console.log("Seeded locations");

    mongoose.disconnect();
    console.log("Disconnected");
  } catch (error) {
    console.error("Error seeding locations:", error);
    process.exit(1);
  }
}

seedLocations();
