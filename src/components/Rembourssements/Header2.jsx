import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation (if using)
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import AccountCircle icon correctly
import ExitToApp from '@mui/icons-material/ExitToApp'; // Import ExitToApp icon for logout
import AxiosInstance from '../Axios'; // Assurez-vous que le chemin est correct
import logo from './logoo.png'; // Assurez-vous que le chemin est correct

const Header = () => {
  // State for user dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(''); // State for storing user's name
  const navigate = useNavigate(); // Get the navigate function (if using)
  
  // Function for handling menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/profile/');
        setUserName(`${response.data.first_name} ${response.data.last_name}`);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <nav className="Header">
      <div className="c">
        <img src={logo} alt="Paymee Logo" className="logo" />
      </div>
      <div className="right-corner">
        <span className="user-name">{userName}</span> {/* Display user's name */}
        <IconButton
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
      

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Déconnexion</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
