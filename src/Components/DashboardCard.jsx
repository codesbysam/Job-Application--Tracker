import { Link } from "react-router-dom";

const DashboardCard = ({ to, icon: Icon, title, description }) => {
  return (
    <div>
      <Link to={to} className="dashboard-card-link">
        <span className="dashboard-card-icon">
          <Icon />
        </span>
        <h5 className="dashboard-card-title">{title}</h5>
        <p className="dashboard-card-description">{description}</p>
      </Link>
    </div>
  );
};

export default DashboardCard;
