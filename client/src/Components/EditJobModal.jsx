import { useState } from "react";

const EditJobModal = ({ job, setEditModal, onEditJob }) => {
  // MongoDB returns dates as full ISO strings (e.g. "2026-08-16T00:00:00.000Z"),
  // but a <input type="date"> needs just "YYYY-MM-DD" - so we trim it here.
  const [editedJob, setEditedJob] = useState({
    ...job,
    applicationDate: job.applicationDate ? job.applicationDate.slice(0, 10) : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const handleSaveChanges = () => {
    onEditJob(editedJob);
    setEditModal(false);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Job</h2>
          <button type="button" className="modal-close" onClick={handleCancel}>×</button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={editedJob.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={editedJob.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Application Date</label>
            <input
              type="date"
              name="applicationDate"
              value={editedJob.applicationDate}
              onChange={handleInputChange}
              placeholder="Application Date"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={editedJob.status}
              onChange={handleInputChange}
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
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" onClick={handleSaveChanges} className="btn btn-accent">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
