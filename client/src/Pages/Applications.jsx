import { useState, useEffect } from "react";
import { FaPlus, FaList, FaThLarge } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import AddNewJobs from "../Components/AddNewJob";
import EditJobModal from "../Components/EditJobModal";
import { getJobs, createJob, updateJob, deleteJob } from "../api";

const Applications = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [checkedJobs, setCheckedJobs] = useState([]);
  const [isCardView, setIsCardView] = useState(true);

  useEffect(() => {
    // Load jobs from the backend (GET /api/jobs) when the page mounts
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error.message);
      }
    };
    loadJobs();
  }, []);

  const handleOpenJobModal = () => {
    setShowJobModal(true);
  };

  const handleAddJob = async (newJob) => {
    try {
      // POST /api/jobs - the backend creates it and returns the saved job (with its own _id)
      const savedJob = await createJob(newJob);
      setJobs([savedJob, ...jobs]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditJob = async (updatedJob) => {
    try {
      // PUT /api/jobs/:id
      const savedJob = await updateJob(updatedJob._id, updatedJob);
      setJobs(jobs.map((job) => (job._id === savedJob._id ? savedJob : job)));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenEditModal = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  const handleDeleteJob = async (jobToDelete) => {
    try {
      // DELETE /api/jobs/:id
      await deleteJob(jobToDelete._id);
      setJobs(jobs.filter((job) => job._id !== jobToDelete._id));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCheckJob = (job) => {
    setCheckedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j._id !== job._id) : [...prev, job]
    );
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Applications</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Total Applications:</span>
            <span style={{ fontWeight: 700 }}>{jobs.length}</span>
          </div>
          <button className="btn btn-primary" onClick={handleOpenJobModal}>
            <span>Add new Job</span>
            <span style={{ display: "flex", fontSize: "0.85rem" }}>
              <FaPlus />
            </span>
          </button>
        </div>
      </div>

      {showJobModal && (
        <AddNewJobs setJobModal={setShowJobModal} onAddJob={handleAddJob} />
      )}

      {showEditModal && (
        <EditJobModal
          job={selectedJob}
          setEditModal={setShowEditModal}
          onEditJob={handleEditJob}
        />
      )}

      <div className="actions-row">
        <form className="search-box-container" onSubmit={(e) => e.preventDefault()}>
          <span className="search-icon-inside">
            <LuSearch />
          </span>
          <input
            type="search"
            name="search"
            placeholder="Search applications..."
            className="form-input search-input-box"
          />
        </form>
        
        <div className="view-toggle-buttons">
          <button
            onClick={() => setIsCardView(true)}
            className={`view-toggle-btn ${isCardView ? "active" : ""}`}
            title="Grid View"
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setIsCardView(false)}
            className={`view-toggle-btn ${!isCardView ? "active" : ""}`}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="tabs-navigation">
        {["all", "applied", "interview", "offered", "rejected"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Job Card view */}
      {isCardView ? (
        <div className="jobs-grid">
          {jobs
            .filter((job) => activeTab === "all" || job.status === activeTab)
            .map((job) => (
              <div
                key={job._id}
                className="job-card"
                onClick={() => handleOpenEditModal(job)}
              >
                <div>
                  <div className="job-card-header">
                    <p className="job-card-title">{job.jobTitle}</p>
                    <button
                      style={{ color: "var(--text-light)", fontSize: "1.2rem", display: "flex" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(job);
                      }}
                      title="Delete Application"
                    >
                      <MdClose />
                    </button>
                  </div>
                  <h3 className="job-card-company">{job.companyName}</h3>
                </div>
                <div className="job-card-footer">
                  <span className={`status-badge ${job.status}`}>{job.status}</span>
                  <p className="job-card-date">
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        // Job List view
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}></th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {jobs
                .filter(
                  (job) => activeTab === "all" || job.status === activeTab
                )
                .map((job) => (
                  <tr key={job._id}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        checked={checkedJobs.some(
                          (checkedJob) => checkedJob._id === job._id
                        )}
                        onChange={() => handleCheckJob(job)}
                      />
                    </td>
                    <td
                      style={{ cursor: "pointer", fontWeight: 600, color: "var(--primary)" }}
                      onClick={() => handleOpenEditModal(job)}
                    >
                      {job.jobTitle}
                    </td>
                    <td>{job.companyName}</td>
                    <td>
                      <span className={`status-badge ${job.status}`}>{job.status}</span>
                    </td>
                    <td>
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {checkedJobs.length > 0 && (
            <div className="bulk-actions-floating">
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                {checkedJobs.length} application(s) selected
              </span>
              <button
                className="btn btn-danger"
                style={{ padding: "0.5rem 1rem" }}
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete the selected jobs?"
                  );
                  if (confirmDelete) {
                    setJobs(
                      jobs.filter(
                        (job) =>
                          !checkedJobs.some(
                            (checkedJob) => checkedJob._id === job._id
                          )
                      )
                    );
                    setCheckedJobs([]);
                  }
                }}
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
