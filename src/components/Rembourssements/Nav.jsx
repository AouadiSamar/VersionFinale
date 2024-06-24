import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();

  // Accès direct au localStorage pour déterminer le rôle de l'utilisateur
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="payments-section">
      <div className="payments-section-header">
        <h2>Chargebacks</h2>
        <div className="payments-Nav">
          {/* Boutons toujours visibles */}
          <button className="navigation-button" onClick={() => navigate('/chargebacks')}>Chargebacks
          </button>
   

          {/* Boutons conditionnels pour l'admin */}
          {userRole === 'admin' && (
            <>
              <button className="navigation-button" onClick={() => navigate('/ChargebackHome')}>
                Gestion des Chargebacks
              </button>
              <button className="navigation-button" onClick={() => navigate('/chargebacks/${chargebackId}/assign/')}>
Affecter ch to User</button>

<button className="navigation-button" onClick={() => navigate('/chargebacks/${chargebackId}/upload/')}>
Affecter file to ch</button>
            </>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;