// This describes what a "Job application" looks like in the database.
// Notice it matches the fields the React form (AddNewJob.jsx) already collects.
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // Every job belongs to exactly one user - this links the two collections together.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    applicationDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offered", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
