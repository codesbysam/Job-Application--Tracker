import React, { useState } from "react";

const AddNewJobs = ({ setJobModal, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      jobTitle,
      companyName,
      applicationDate,
      status,
    };
    onAddJob(newJob);
    setJobTitle("");
    setCompanyName("");
    setApplicationDate("");
    setStatus("applied");
    setJobModal(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setJobModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Job</h2>
          <button className="modal-close" onClick={() => setJobModal(false)}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Application Date</label>
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
              required
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => setJobModal(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-accent">
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewJobs;
