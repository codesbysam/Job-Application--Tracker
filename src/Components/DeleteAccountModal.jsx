import React from "react";

const DeleteAccountModal = ({setDeleteAccountModal}) => {
    const handleCancel = () => {
      setDeleteAccountModal(false);
    };
  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Confirm Delete</h3>
          <button className="modal-close" onClick={handleCancel}>×</button>
        </div>
        <div style={{ margin: "1rem 0 2rem 0", color: "var(--text-muted)" }}>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button className="btn btn-danger">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
