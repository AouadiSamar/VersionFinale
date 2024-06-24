import React, { useState } from 'react';
import axios from './Axios';
import logo from '../components/logopay.png';  // Ensure this path is correct
import './SendResetEmail.css';

const SendMailForm = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    email: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // Track the type of feedback (success or error)

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8000/api/v1/users/send-reset-email/', emailData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setFeedbackMessage(response.data.message);
      setFeedbackType('success'); // Set feedback type to success
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email', error);
      setFeedbackMessage('Erreur lors de l\'envoi de l\'email.');
      setFeedbackType('error'); // Set feedback type to error
    }
  };

  return (
    <div className="reset-password-page">
      <div className="header-logo">
        <img src={logo} alt="Paymee Logo" className="paymee-logo" />
      </div>
      <div className="reset-password-form-section">
        <div className="reset-password-form-container">
          <h2 className="login-title">Reset password</h2>
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label className="form-labe">Please enter your email address !</label>
              <input
                type="email"
                name="email"
                value={emailData.email}
                onChange={handleChange}
                placeholder="*email"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="login-button">Send</button>
            {feedbackMessage && (
              <p className={`feedback-message ${feedbackType}`}>{feedbackMessage}</p>
            )}
          </form>
        </div>
      </div>
      <div className="reset-password-image-section"></div>
    </div>
  );
};

export default SendMailForm;
