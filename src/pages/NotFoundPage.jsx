import React from 'react';
import notFoundImage from './error.png'; // Assurez-vous que le chemin vers votre image est correct
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src={notFoundImage} alt="Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
      <h1>404 - Page Not Found</h1>
      <p>Désolé, la page que vous recherchez nexiste pas.</p>
      <Button
        style={{ backgroundColor: "#034DA3", color: "white" }}
        onClick={() => navigate('/')}
      >
        Revenir vers login page
      </Button>
    </div>
  );
};

export default NotFoundPage;
