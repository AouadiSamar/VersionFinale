import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import './LoginPage.css';
import logopay from './logopay.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const LOGIN_URL = '/api/v1/users/login/2fa/';
      console.log(`Sending login request to ${LOGIN_URL} with email: ${email}, password: ${password}`);
      const response = await AxiosInstance.post(LOGIN_URL, { email, password });
      console.log('Login response:', response);

      if (response.data.message) {
        setStep(2);
      }
    } catch (error) {
      let errorMessage = 'Email or password is incorrect!';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setErrorMessage(errorMessage);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      const VERIFY_URL = '/api/v1/users/login/verify/';
      console.log(`Sending verify request to ${VERIFY_URL} with code: ${verificationCode}`);
      const response = await AxiosInstance.post(VERIFY_URL, { secret_code: verificationCode });
      console.log('Verify response:', response);

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        navigate('/Chart');
      } else {
        console.error('Verification failed:', response.data);
        setErrorMessage('Verification code is incorrect!');
      }
    } catch (error) {
      let errorMessage = 'Verification code is incorrect!';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      console.error('Error verifying code:', error.response ? error.response.data : error.message);
      setErrorMessage(errorMessage);
    }
  };

  const handleResetEmailClick = () => {
    navigate('/send-reset-email');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Connexion</h2>
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          {step === 1 && (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Connexion</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="login-form">
              <div className="form-group">
                <label className="form-label">Verification Code:</label>
                <input
                  type="text"
                  className="form-input"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Verify</button>
            </form>
          )}

          <button className="reset-password-button" onClick={handleResetEmailClick}>Reset Password</button>
        </div>
      </div>
      <div className="login-image">
        <div className="login-logo-container">
          <img src={logopay} alt="Logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
