import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CommentSection from './ChargebackFilesComments'; // Ensure the path is correct
import './ChargebackDetails .css'; // Ensure the path is correct
import FileUpload from './FileUpload'; // Import the FileUpload component

const ChargebackDetails = () => {
  const { id: chargebackId } = useParams();
  const [chargeback, setChargeback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const [openPrediction, setOpenPrediction] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false); // For file upload modal

  const fetchChargebackDetails = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/`);
      setChargeback(data);
    } catch (error) {
      console.error('Failed to fetch chargeback details:', error);
    }
    setLoading(false);
  };

  const handlePredictResolutionTime = async () => {
    try {
      const data = {
        authorization_number: chargeback.authorization_number,
        amount: parseFloat(chargeback.amount),
        status: chargeback.status,
        reason: chargeback.reason
      };
      const response = await axios.post('http://localhost:8000/api/v1/chargebacks/predict/', data, {
        responseType: 'blob'
      });

      const prediction = response.headers['predicted_resolution_time_days'];
      setPrediction(prediction);

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(response.data);
      
      setOpenPrediction(true);
    } catch (error) {
      console.error('Error predicting resolution time:', error);
      alert('Failed to predict resolution time. Please try again.');
    }
  };

  const handleClosePrediction = () => {
    setOpenPrediction(false);
    setImage(null);
    setPrediction(null);
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
    fetchChargebackDetails();
  }, [chargebackId]);

  if (loading) return <p></p>;
  if (!chargeback) return <p>No chargeback found</p>;

  const formattedAmount = chargeback.amount ? `TND ${parseFloat(chargeback.amount).toFixed(2)}` : 'N/A';

  return (
    <div className="chargeback-details-container">
      <div className="leeft-section">
      </div>
      <div className="right-section">
        <h1>Chargeback Details - {chargeback.authorization_number}</h1>
        <p><strong>Authorization Number:</strong> {chargeback.authorization_number}</p>
        <p><strong>Amount:</strong> {formattedAmount}</p>
        <p><strong>Status:</strong> {chargeback.status}</p>
        <p><strong>Merchant Number:</strong> {chargeback.merchant_number}</p>
        <p><strong>Merchant Email:</strong> {chargeback.merchant_email}</p>
        <p><strong>Merchant Name:</strong> {chargeback.merchant_name}</p>
        <p><strong>Reason:</strong> {chargeback.reason}</p>
        <p><strong>Creation Date:</strong> {new Date(chargeback.creation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <div className="buttons">
          <button className="button predict-button" onClick={handlePredictResolutionTime}>
            Predict Resolution Time
          </button>
          <button className="button " onClick={handleOpenComments}>
            Go to Comments
          </button>
          <button className="button " onClick={handleOpenFileUpload}>
            Upload File
          </button>
        </div>
        <Dialog open={openPrediction} onClose={handleClosePrediction} maxWidth="lg" fullWidth>
          <DialogTitle>Predicted Resolution Time</DialogTitle>
          <DialogContent>
            {prediction && <p>Predicted Resolution Time: {prediction} days</p>}
            {image && <img src={image} alt="Prediction Plot" className="prediction-image" />}
          </DialogContent>
        </Dialog>
        <Dialog open={openComments} onClose={handleCloseComments} maxWidth="lg" fullWidth>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <CommentSection chargebackId={chargebackId} />
          </DialogContent>
        </Dialog>
        <Dialog open={openFileUpload} onClose={handleCloseFileUpload} maxWidth="lg" fullWidth>
          <DialogTitle>Upload File</DialogTitle>
          <DialogContent>
            <FileUpload chargebackId={chargebackId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChargebackDetails;