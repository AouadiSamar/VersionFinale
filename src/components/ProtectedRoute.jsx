import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Remplacer 'Redirect' par 'Navigate'
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = Boolean(localStorage.getItem('accesstoken'));

  return (
    <Route
      {...rest}
      element={
        isAuth ? (
          <Component />
        ) : (
          // Utiliser 'Navigate' pour la redirection
          <Navigate to="/" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
