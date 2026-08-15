// This is the entry point of the backend. Run it with: npm run dev
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // allows the React app (different port) to call this API
app.use(express.json()); // lets us read req.body as JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
