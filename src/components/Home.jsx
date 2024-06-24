import React, { useEffect, useState, useCallback } from 'react';
import AxiosInstance from './Axios';
import { Box, IconButton, Button, TextField, InputAdornment, Modal, Typography } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Home.css';
import myEditIcon from './eee.png';
import myDeleteIcon from './delete.png';
import myreacIcon from './reac.png';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await AxiosInstance.get('/api/v1/users/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(filter.toLowerCase())
  );

  const handleOpen = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const toggleUserStatus = async () => {
    const user = users.find(user => user.id === selectedUserId);
    if (!user) return;

    const newStatus = !user.is_active;

    try {
      const response = await AxiosInstance.patch(`/api/v1/users/${selectedUserId}/toggle-active/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === selectedUserId ? { ...u, is_active: newStatus } : u
        )
      );
      console.log('Toggled user status successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      alert('Failed to toggle user status. Please try again.');
    }
  };

  return (
    <div className="home-container">
      <div className="title-and-button-container">
        <h2 className="page-title">Users</h2>
        <div className="search-input-wrapper">
          <TextField
            variant="outlined"
            placeholder="Search by name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <h1 className="icon-bottom"></h1>
        <div className="hh">
          <button className="adp-user-button"  onClick={() => navigate('/createuser')}>
            + Add user
          </button>
        </div>
      </div>
      {loading ? (
        <p></p>
      ) : (
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-rows">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.role_names ? user.role_names.join(', ') : 'N/A'}</td>
                <td>{new Date(user.creation_date).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric'
                }).replace(/ /g, ' ')}</td>
                <td>
                  <Box className="actions-cell">
                    <IconButton component={Link} to={`/edit-user/${user.id}`} className="edit-button">
                      <img src={myEditIcon} alt="Edit" />
                    </IconButton>
                    <IconButton onClick={() => handleOpen(user.id)} className="toggle-button">
                      <img 
                        src={user.is_active ? myDeleteIcon : myreacIcon} 
                        alt={user.is_active ? "Toggle Active" : "Toggle Desactive"} 
                      />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={open} onClose={handleClose}>
        <div className="modal-container">
          <Typography className="h6">Are you sure you want to change this user's status?</Typography>
          <Box className="modal-actions">
            <Button onClick={handleClose}  className="mo1o">
Cancel           </Button>
            <Button className="mo" onClick={toggleUserStatus}  >
              Confirm
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
