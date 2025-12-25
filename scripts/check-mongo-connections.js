// scripts/check-mongo-connections.js
require("dotenv").config();
const mongoose = require("mongoose");

async function checkConnections() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error("MONGODB_URI not found in environment variables");
      return;
    }

    console.log("Checking MongoDB connection status...");

    // Connect to MongoDB with pool settings
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
      compressors: ["zlib"],
    });

    console.log("Connected successfully");

    // Get connection stats
    const stats = await mongoose.connection.db.admin().serverStatus();
    console.log("Connection pool stats:");
    console.log(
      "- Total connections created:",
      stats.connections?.totalCreated || "N/A"
    );
    console.log("- Current connections:", stats.connections?.current || "N/A");
    console.log(
      "- Available connections:",
      stats.connections?.available || "N/A"
    );
    console.log("- Active connections:", stats.connections?.active || "N/A");
    console.log("- Pool size limit:", 10);
    console.log("- Min pool size:", 2);
    console.log("- Max idle time:", "30 seconds");
    console.log("- Socket timeout:", "45 seconds");

    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error checking connections:", error.message);
  }
}

checkConnections();
