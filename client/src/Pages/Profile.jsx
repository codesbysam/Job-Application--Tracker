import { useState, useEffect } from "react";
import {
  MdMailOutline,
  MdOutlineCall,
  MdOutlineLocationOn,
  MdOutlineEdit,
  MdAdd,
} from "react-icons/md";

const Profile = () => {
  const [editingName, setEditingName] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editingJobPreferences, setEditingJobPreferences] = useState(false);
  const [editingResume, setEditingResume] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
    }
  }, []);

  const handleEditToggle = (section) => {
    if (section === "personal") {
      setEditingPersonal(!editingPersonal);
    } else if (section === "experience") {
      setEditingExperience(!editingExperience);
    } else if (section === "jobPreferences") {
      setEditingJobPreferences(!editingJobPreferences);
    } else if (section === "resume") {
      setEditingResume(!editingResume);
    } else if (section === "skills") {
      setEditingSkills(!editingSkills);
    } else if (section === "name") {
      setEditingName(!editingName);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Profile</h2>
      </div>

      <div className="profile-card-header">
        <div className="profile-avatar-container">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="profile-name-edit-group">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editingName}
            className="profile-name-display"
            style={{
              border: editingName ? "1px solid var(--border)" : "none",
              background: editingName ? "var(--bg-app)" : "transparent",
              textAlign: "center",
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius-sm)",
              fontWeight: 800,
              width: "250px"
            }}
          />
          {editingName ? (
            <button
              className="btn btn-secondary"
              style={{ padding: "0.4rem 1rem" }}
              onClick={() => handleEditToggle("name")}
            >
              Save
            </button>
          ) : (
            <MdOutlineEdit
              className="btn-icon"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditToggle("name")}
            />
          )}
        </div>
      </div>

      <div className="profile-grid-layout">
        {/* PERSONAL INFORMATION */}
        <div className="profile-section-box">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Personal Details</h3>
            {editingPersonal ? (
              <button
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem" }}
                onClick={() => handleEditToggle("personal")}
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                className="btn-icon"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditToggle("personal")}
              />
            )}
          </div>
          <div className="profile-details-list">
            <div className="profile-detail-row">
              <span className="profile-detail-icon"><MdMailOutline /></span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editingPersonal}
                className="form-input"
                style={{
                  border: editingPersonal ? "1px solid var(--border)" : "none",
                  background: "transparent",
                  padding: editingPersonal ? "0.5rem" : "0"
                }}
              />
            </div>
            <div className="profile-detail-row">
              <span className="profile-detail-icon"><MdOutlineCall /></span>
              <input
                id="tel"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editingPersonal}
                className="form-input"
                style={{
                  border: editingPersonal ? "1px solid var(--border)" : "none",
                  background: "transparent",
                  padding: editingPersonal ? "0.5rem" : "0"
                }}
              />
            </div>
            <div className="profile-detail-row">
              <span className="profile-detail-icon"><MdOutlineLocationOn /></span>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!editingPersonal}
                className="form-input"
                style={{
                  border: editingPersonal ? "1px solid var(--border)" : "none",
                  background: "transparent",
                  padding: editingPersonal ? "0.5rem" : "0"
                }}
              />
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="profile-section-box">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Experience</h3>
            {editingExperience ? (
              <button
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem" }}
                onClick={() => handleEditToggle("experience")}
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                className="btn-icon"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditToggle("experience")}
              />
            )}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              disabled={!editingExperience}
              className="form-textarea"
              placeholder="Tell us about your work experience..."
              rows={4}
              style={{
                border: editingExperience ? "1px solid var(--border)" : "none",
                background: editingExperience ? "var(--bg-app)" : "transparent",
                padding: editingExperience ? "0.5rem" : "0",
                resize: editingExperience ? "vertical" : "none"
              }}
            />
          </div>
        </div>

        {/* JOB PREFERENCE */}
        <div className="profile-section-box">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Job Preferences</h3>
            {editingJobPreferences ? (
              <button
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem" }}
                onClick={() => handleEditToggle("jobPreferences")}
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                className="btn-icon"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditToggle("jobPreferences")}
              />
            )}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label htmlFor="jobtype" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Job Type:</label>
            <input
              id="jobtype"
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              disabled={!editingJobPreferences}
              className="form-input"
              style={{
                border: editingJobPreferences ? "1px solid var(--border)" : "none",
                background: "transparent",
                padding: editingJobPreferences ? "0.5rem" : "0",
                maxWidth: "200px"
              }}
            />
          </div>
        </div>

        {/* RESUME */}
        <div className="profile-section-box">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Resume</h3>
            {editingResume ? (
              <button
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem" }}
                onClick={() => handleEditToggle("resume")}
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                className="btn-icon"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditToggle("resume")}
              />
            )}
          </div>
          <div style={{ marginTop: "1rem" }}>
            {resume ? (
              <div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Uploaded Resume: <strong style={{ color: "var(--text-main)" }}>{resume.name}</strong>
                </p>
              </div>
            ) : (
              <input
                type="file"
                onChange={handleResumeChange}
                disabled={!editingResume}
                className="form-input"
                style={{
                  border: editingResume ? "1px solid var(--border)" : "none",
                  background: editingResume ? "var(--bg-app)" : "transparent",
                  padding: editingResume ? "0.5rem" : "0"
                }}
              />
            )}
          </div>
        </div>

        {/* SKILLS */}
        <div className="profile-section-box" style={{ gridColumn: "1 / -1" }}>
          <div className="profile-section-header">
            <h3 className="profile-section-title">Professional Skills</h3>
            {editingSkills ? (
              <button
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem" }}
                onClick={() => handleEditToggle("skills")}
              >
                Save
              </button>
            ) : (
              <MdOutlineEdit
                className="btn-icon"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditToggle("skills")}
              />
            )}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div className="profile-skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  {editingSkills && (
                    <button
                      className="skill-tag-delete"
                      onClick={() => handleDeleteSkill(index)}
                      title="Remove skill"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {skills.length === 0 && (
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem", fontStyle: "italic" }}>No skills added yet.</p>
              )}
            </div>

            {editingSkills && (
              <div className="add-skill-control">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="form-input add-skill-input"
                  placeholder="Add skill (e.g. React)"
                />
                <button
                  className="btn btn-accent"
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={handleAddSkill}
                >
                  <MdAdd />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
