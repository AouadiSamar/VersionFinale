import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar2';
import Header from './Header2';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <div className="main-content">
          <div className="dashboard-main-content">
            {children} {/* Home or other content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
