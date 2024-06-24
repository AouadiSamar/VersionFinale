import React from 'react';
import PropTypes from 'prop-types'; // Assurez-vous d'installer le package 'prop-types'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

// Définir les types attendus pour les props
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// Vous pouvez également définir des defaultProps si nécessaire
// Modal.defaultProps = {
//   isOpen: false,
//   onClose: () => {},
//   children: null,
// };

export default Modal;
