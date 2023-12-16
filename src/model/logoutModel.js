import React from 'react';

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-container">
    <div className="modal-head">Confirmation</div>
    <div className="modal-content">Are you sure you want to LogOut ?</div>
    <div className="modal-buttons">
      <button className="confirm-button" onClick={onConfirm}>Yes</button>
      <button className="cancel-button" onClick={onCancel}>No</button>
    </div>
  </div>
  );
}

export default ConfirmationModal;