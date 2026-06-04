import { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { LuUserCircle2, LuSearch } from "react-icons/lu";
import { FaLongArrowAltRight, FaRegLightbulb } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import DashboardCard from "../Components/DashboardCard";
import "chart.js/auto";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedData =
      JSON.parse(localStorage.getItem("applicationData")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    setJobs(storedJobs);
    setApplicationData(storedData);
    setUserName(storedUser.name || "");
    setUserEmail(storedUser.email || "");
  }, []);

  const jobStatusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(jobStatusCount),
    datasets: [
      {
        label: "Job Applications",
        data: Object.values(jobStatusCount),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const data = {
    labels: applicationData.map((item) => item.status),
    datasets: [
      {
        label: "Applications",
        data: applicationData.map((item) => item.count),
        backgroundColor: ["#36A2EB", "#FFCE56", "#00842B", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  const resources = [
    {
      title: "Resume and cover letter template",
      viewUrl: "https://zety.com/cover-letter-templates",
    },
    {
      title: "Interview preparation guide",
      viewUrl:
        "https://www.themuse.com/advice/the-ultimate-interview-guide-30-prep-tips-for-job-interview-success",
    },
    {
      title: "Job search strategies",
      viewUrl: "https://www.careerflow.ai/blog/job-search-guide",
    },
    {
      title: "Networking tips",
      viewUrl: "https://hbr.org/2023/03/a-beginners-guide-to-networking",
    },
    { title: "Career development plan", viewUrl: "" },
    { title: "Salary negotiation tactics", viewUrl: "" },
  ];

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const totalApplications = applicationData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalRejected =
    applicationData.find((item) => item.status === "Rejected")?.count || 0;
  const totalInterviews =
    applicationData.find((item) => item.status === "Interview")?.count || 0;
  const totalOffers =
    applicationData.find((item) => item.status === "Offer")?.count || 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          {getGreeting()}, {userName || "User"}
        </h1>
        <div className="user-profile-badge">
          <div className="user-info">
            <p>{userName || "User"}</p>
            <p>{userEmail || "you@example.com"}</p>
          </div>
        </div>
      </div>

      <div className="getting-started-section">
        <h2 className="getting-started-title">Getting Started</h2>
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: "45%" }}></div>
          </div>
          <span className="progress-text">45% done</span>
        </div>

        <div className="dashboard-grid">
          <DashboardCard
            to="/dashboard/profile"
            icon={LuUserCircle2}
            title="Complete profile"
            description="Add your professional info"
          />
          <DashboardCard
            to="/dashboard/job"
            icon={LuSearch}
            title="Find Jobs"
            description="Browse matching job roles"
          />
          <DashboardCard
            to="/dashboard/applications"
            icon={BsBriefcase}
            title="Update applications"
            description="Track interview and offer status"
          />
          <DashboardCard
            to="/dashboard"
            icon={FaRegLightbulb}
            title="Interview Prep"
            description="Prepare using search tips"
          />
        </div>
      </div>

      <div className="analytics-layout">
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem" }}>
              Applications Tracking
            </h3>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-icon"
              title="Chart options"
            >
              <CiMenuKebab style={{ transform: "rotate(90deg)" }} />
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <button
                  className="menu-dropdown-item"
                  onClick={() => {
                    setChartType("doughnut");
                    setMenuOpen(false);
                  }}
                >
                  Doughnut Chart
                </button>
                <button
                  className="menu-dropdown-item"
                  onClick={() => {
                    setChartType("pie");
                    setMenuOpen(false);
                  }}
                >
                  Pie Chart
                </button>
              </div>
            )}
          </div>

          <div className="chart-wrapper">
            <div style={{ width: "100%", maxWidth: "240px" }}>
              {chartType === "doughnut" ? (
                <Doughnut data={data} options={options} />
              ) : (
                <Pie data={data} options={options} />
              )}
            </div>
            <div className="chart-legend-container">
              <div className="legend-item">
                <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#36A2EB" }}></span>
                <span>Applied: {totalApplications - totalInterviews - totalOffers - totalRejected}</span>
              </div>
              <div className="legend-item">
                <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#FFCE56" }}></span>
                <span>Interviews: {totalInterviews}</span>
              </div>
              <div className="legend-item">
                <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#00842B" }}></span>
                <span>Offers: {totalOffers}</span>
              </div>
              <div className="legend-item">
                <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#FF6384" }}></span>
                <span>Rejected: {totalRejected}</span>
              </div>
            </div>
          </div>

          <div className="stats-grid-row">
            <div className="stat-box">
              <span className="stat-box-label">Total Applications</span>
              <span className="stat-box-value">{totalApplications}</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Interviews Scheduled</span>
              <span className="stat-box-value">{totalInterviews}</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Job Offers</span>
              <span className="stat-box-value">{totalOffers}</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-label">Rejected</span>
              <span className="stat-box-value">{totalRejected}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", marginBottom: "1rem" }}>
            Resources
          </h3>
          <div className="resources-list">
            {resources.map((resource, index) => (
              <div key={index} className="resource-item">
                <p className="resource-title">{resource.title}</p>
                {resource.viewUrl ? (
                  <a
                    href={resource.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                    title="View Link"
                  >
                    <FaLongArrowAltRight />
                  </a>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Coming soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
