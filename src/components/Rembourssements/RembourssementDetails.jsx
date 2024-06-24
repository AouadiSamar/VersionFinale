import React, { useState, useEffect } from 'react';

import axios from '../Axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CommentSection from './RembourssementFilesComments'; // Ensure the correct path to the comment section component
import './RembourssementDetails .css'; // Ensure the correct path to the CSS file


import FileUpload2 from './FileUpload2'; // Import the FileUpload component


const RembourssementDetails = () => {
  const { id: rembourssementId } = useParams();
  const [rembourssement, setRembourssement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openComments, setOpenComments] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false); // For file upload modal

  const fetchRembourssementDetails = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/rembourssement/${rembourssementId}/`);
      setRembourssement(data);
    } catch (error) {
      console.error('Failed to fetch rembourssement details:', error);
    }
    setLoading(false);
  };



     
  const handleOpenComments = () => {
    setOpenComments(true);
  };

  const handleCloseComments = () => {
    setOpenComments(false);
  };

  const handleOpenFileUpload = () => {
    setOpenFileUpload(true);
  };

  const handleCloseFileUpload = () => {
    setOpenFileUpload(false);
  };

  useEffect(() => {
    fetchRembourssementDetails();
  }, [rembourssementId]);

  if (loading) return <p>Loading...</p>;
  if (!rembourssement) return <p>No rembourssement found</p>;

  const formattedAmount = rembourssement.amount ? `TND ${parseFloat(rembourssement.amount).toFixed(2)}` : 'N/A';

  return (
    <div className="rembourssement-details-container">
      <div className="left-section">
      </div>
      <div className="right-section">
        <h1>Rembourssement Details - {rembourssement.authorization_number}</h1>
        <p><strong>Authorization Number:</strong> {rembourssement.authorization_number}</p>
        <p><strong>Amount:</strong> {formattedAmount}</p>
        <p><strong>Status:</strong> {rembourssement.status}</p>
        <p><strong>Merchant Number:</strong> {rembourssement.merchant_number}</p>
        <p><strong>Merchant Email:</strong> {rembourssement.merchant_email}</p>
        <p><strong>Merchant Name:</strong> {rembourssement.merchant_name}</p>
        <p><strong>Reason:</strong> {rembourssement.reason}</p>
        <p><strong>Creation Date:</strong> {new Date(rembourssement.creation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <div className="buttons">
        
          <button className="button " onClick={handleOpenComments}>
            Go to Comments
          </button>
          <button className="button " onClick={handleOpenFileUpload}>
            Upload File
          </button>
        </div>
        
        <Dialog open={openComments} onClose={handleCloseComments} maxWidth="lg" fullWidth>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <CommentSection rembourssementId={rembourssementId} />
          </DialogContent>
        </Dialog>
        <Dialog open={openFileUpload} onClose={handleCloseFileUpload} maxWidth="lg" fullWidth>
          <DialogTitle>Upload File</DialogTitle>
          <DialogContent>
            <FileUpload2 rembourssementId={rembourssementId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RembourssementDetails;
