// This file's only job is to connect to MongoDB using Mongoose.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Stop the app if we can't connect to the DB - no point running without it
    process.exit(1);
  }
};

module.exports = connectDB;
