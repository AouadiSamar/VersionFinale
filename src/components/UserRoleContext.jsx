import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context
const UserRoleContext = createContext();

// Provider component
export const UserRoleProvider = ({ children }) => {
  const [userRole] = useState(localStorage.getItem('userRole') || 'user'); // or fetch from an API

  return (
    <UserRoleContext.Provider value={userRole}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Prop types validation
UserRoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the UserRoleContext
export const useUserRole = () => {
  return useContext(UserRoleContext);
};
