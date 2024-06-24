import React from 'react';
import './PaymentsNavigation.css'; // Make sure this CSS file is correctly imported
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentsNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="payments-section">
  
      <div className="payments-section2">
        <span className={`navigation-text ${isActive('/user') ? 'active' : ''}`} onClick={() => navigate('/user')}>
        Account        </span>
        <span className={`navigation-text ${isActive('/configuration') ? 'active' : ''}`} onClick={() => navigate('/configuration')}>
        Configuration        </span>
        <span className={`navigation-text ${isActive('/home') ? 'active' : ''}`} onClick={() => navigate('/home')}>
        User Management        </span>
        <span className={`navigation-text ${isActive('/create-role') ? 'active' : ''}`} onClick={() => navigate('/create-role')}>
        Role management        </span>
      </div>
    </div>
  );
};

export default PaymentsNavigation;
