import React from 'react'
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios'; // Adjusted to use your AxiosInstance for consistency
import { useNavigate, useParams } from 'react-router-dom';

const DeleteUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/users/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

// DeleteUser.jsx
const handleDelete = async () => {
  try {
      // Notez l'ajout de '/delete/' à la fin de l'URL
      await AxiosInstance.delete(`/api/v1/users/usersd/${id}/`);
      console.log("Utilisateur supprimé avec succès.");
      navigate('/home'); // Redirige l'utilisateur vers la page d'accueil
  } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};

  

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
            <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
              Delete User: {userData.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
              Are you sure you want to delete this user: {userData.name}?
            </Box>

            <Box sx={{ width: '30%' }}>
              <Button variant="contained" onClick={handleDelete} sx={{ width: '100%' }}>
                Delete User
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
