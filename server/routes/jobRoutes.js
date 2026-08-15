const express = require("express");
const Job = require("../models/Job");
const protect = require("../middleware/auth");

const router = express.Router();

// Every route below runs `protect` first, so req.userId is always available.

// @route   GET /api/jobs
// @desc    Get all jobs belonging to the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job application
router.post("/", protect, async (req, res) => {
  try {
    const { jobTitle, companyName, applicationDate, status } = req.body;

    const job = await Job.create({
      user: req.userId,
      jobTitle,
      companyName,
      applicationDate,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job application
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.userId });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { jobTitle, companyName, applicationDate, status } = req.body;
    job.jobTitle = jobTitle ?? job.jobTitle;
    job.companyName = companyName ?? job.companyName;
    job.applicationDate = applicationDate ?? job.applicationDate;
    job.status = status ?? job.status;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job application
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
