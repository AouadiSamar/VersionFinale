import { useParams, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import React, { useState,  } from 'react';

function ChangeChargebackStatus() {
  const { chargebackId } = useParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Declare the navigate function

  const updateStatus = async () => {
    if (!status) {
      setError('Please select a status.');
      return;
    }

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/update-status/`, {
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Status updated successfully:', response.data);
      navigate('/ChargebackHome'); // Navigate to ChargebackHome after a successful update

    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update status.');
      
    }
  };

  return (
    <div>
      <h3>Change Chargeback Status</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select a status</option>
        <option value="created">Created</option>
        <option value="sent_to_merchant">Sent to Merchant</option>
        <option value="processing_by_paymee">Processing by Paymee</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
      <button onClick={updateStatus}>Update Status</button>
    </div>
  );
}

export default ChangeChargebackStatus;
