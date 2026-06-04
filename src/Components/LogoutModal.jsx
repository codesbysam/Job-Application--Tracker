import React from "react";
import { Link } from "react-router-dom";

const LogoutModal = ({ setOpenLogoutModal }) => {
  const closeLogoutModal = () => {
    setOpenLogoutModal(false); 
  };

  return (
    <div className="modal-overlay" onClick={closeLogoutModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Confirm Logout</h3>
          <button className="modal-close" onClick={closeLogoutModal}>×</button>
        </div>
        <div style={{ margin: "1rem 0 2rem 0", color: "var(--text-muted)" }}>
          <p>Are you sure you want to log out?</p>
        </div>
        <div className="modal-actions">
          <button onClick={closeLogoutModal} className="btn btn-secondary">
            Cancel
          </button>
          <Link to="/login" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
