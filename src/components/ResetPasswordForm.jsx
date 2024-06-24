import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './Axios';
import logo from '../components/logoo.png';
import './ResetPasswordForm.css';

const BACKEND_DOMAIN = 'http://localhost:8000';

const ResetPasswordForm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordConfirm = async ({ uid, token, newPassword, confirmPassword }) => {
    const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
    const data = {
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: confirmPassword,
    };

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      const response = await resetPasswordConfirm({ uid, token, newPassword, confirmPassword });
      alert('Votre mot de passe a été réinitialisé avec succès.');
      alert(response.message);
      navigate('/');
    } catch (error) {
      console.error('Échec de la réinitialisation du mot de passe', error);
      alert('Échec de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="header-logo">
        <img src={logo} alt="Paymee Logo" className="paymee-logo" />
      </div>
      <div className="reset-password-form-section">
        <div className="reset-password-form-container">
          <h2 className="login-title">Reset Password</h2>
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label className="form-labe">New Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password*"
                  required
                  className="form-input"
                />
                <i onClick={() => setShowPassword(!showPassword)} className="fa fa-eye password-icon"></i>
              </div>
            </div>

            <div className="form-group">
              <label className="form-labe">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password* "
                  required
                  className="form-input"
                />
                <i onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="fa fa-eye password-icon"></i>
              </div>
            </div>

            <button type="submit" className="login-button">Reset</button>
          </form>
        </div>
      </div>
      <div className="reset-password-image-section"></div>
    </div>
  );
};

export default ResetPasswordForm;
