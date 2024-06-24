import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, IconButton, TextField, InputAdornment, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../Axios';
import myEditIcon from '../eee.png';
import myDeactivateIcon from '../rt.png';
import myReactivateIcon from './icon7.png';
import './ChargebackHome.css';

const ChargebacksHome = () => {
  const [chargebacks, setChargebacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/chargebacks/');
      setChargebacks(response.data);
    } catch (error) {
      console.error('Error retrieving chargebacks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleActiveStatus = async (chargeback) => {
    const newStatus = !chargeback.is_active;
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/chargebacks/${chargeback.id}/ac_des/`, {
        is_active: newStatus
      });
      if (response.status === 200) {
        const updatedChargebacks = chargebacks.map(cb => {
          if (cb.id === chargeback.id) {
            return { ...cb, is_active: newStatus };
          }
          return cb;
        });
        setChargebacks(updatedChargebacks);
      } else {
        console.error('Failed to toggle active status:', response);
        alert('Failed to toggle active status. Please try again.');
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to toggle active status. Please try again.');
    }
  };
  const filteredChargebacks = chargebacks.filter(chargeback =>
    chargeback.authorization_number?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="ho-container">
      <div className="title-and-button-container">
        <h2 className="page-title">Chargebacks</h2>
        <TextField
          variant="outlined"
          placeholder="Search by Auth Num"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginRight: 20 }}
        />
        <button className='addche' onClick={() => navigate('/chargebacks/create/')}>
          + Add Chargeback
        </button>
      </div>

      {loading ? (
        <p></p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Authorization Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredChargebacks.map((chargeback) => (
              <tr key={chargeback.id}>
                <td>
                  <Link to={`/chargebacks/${chargeback.id}`}>{chargeback.id}</Link>
                </td>
                <td>{chargeback.authorization_number}</td>
                <td>{chargeback.amount}</td>
                <td style={{ color: chargeback.is_active ? 'black' : 'red' }}>
                  {chargeback.status} {chargeback.is_active ? '' : '(Deactivated)'}
                </td>
                <td>{new Date(chargeback.creation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td>
                  <Box className="icon-container">
                    <IconButton component={Link} to={`/chargebacks/${chargeback.id}/edit`} className="edit-button">
                      <img src={myEditIcon} alt="Edit" />
                    </IconButton>
                    {chargeback.is_active ? (
                      <IconButton onClick={() => handleToggleActiveStatus(chargeback)} className="deactivate-button">
                        <img src={myDeactivateIcon} alt="Deactivate" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleToggleActiveStatus(chargeback)} className="reactivate-button">
                        <img src={myReactivateIcon} alt="Reactivate" />
                      </IconButton>
                    )}
                    
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  );
};

export default ChargebacksHome;
