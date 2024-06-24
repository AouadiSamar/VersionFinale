import React from 'react';
import { IconButton, Box, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';
import { updateChargebackStatus } from '../../services/chargebackService'; // Ensure correct import path

const ActionsCell = ({ chargeback }) => {
  const toggleStatus = async () => {
    const newStatus = chargeback.status === 'deactivated' ? 'reactivated' : 'deactivated';
    try {
      await updateChargebackStatus(chargeback.id, newStatus);
      chargeback.statusCallback();  // Call the parent update function
    } catch (error) {
      console.error('Failed to toggle status:', error);
      alert(`Failed to toggle status: ${error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <IconButton component={Link} to={`/chargebacks/${chargeback.id}/edit`}>
        <EditIcon />
      </IconButton>
      <Switch
        checked={chargeback.status === 'reactivated'}
        onChange={toggleStatus}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
  );
};

// Define PropTypes for ActionsCell
ActionsCell.propTypes = {
  chargeback: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    statusCallback: PropTypes.func.isRequired,
  }).isRequired,
};

export default ActionsCell;
