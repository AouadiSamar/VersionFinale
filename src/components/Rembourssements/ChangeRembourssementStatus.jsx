import { useParams, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import React, { useState } from 'react';

function ChangeRembourssementStatus() {
  const { rembourssementId } = useParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateStatus = async () => {
    if (!status) {
      setError('Please select a status.');
      return;
    }

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/v1/rembourssement/${rembourssementId}/update-status/`, {
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Status updated successfully:', response.data);
      navigate('/RembourssementHome'); // Navigate to RembourssementHome after a successful update

    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update status.');
    }
  };

  return (
    <div>
      <h3>Change Rembourssement Status</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select a status</option>
        <option value="created">Created</option>
        <option value="sent_to_merchant">Sent to Merchant</option>
        <option value="processing_by_SMT">Processing by SMT</option>
        <option value="processing_by_bank">Processing by Bank</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
        <option value="cancelled">Cancelled</option>
        <option value="reactivate">Reactivate</option>
      </select>
      <button onClick={updateStatus}>Update Status</button>
    </div>
  );
}

export default ChangeRembourssementStatus;
