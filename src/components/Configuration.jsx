import React, { useState, useEffect } from 'react';
import axios from './Axios';
import './Configuration.css';

const Configuration = () => {
  const [notificationSetting, setNotificationSetting] = useState(true);

  useEffect(() => {
    const fetchNotificationSetting = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/chargebacks/notification-settings/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setNotificationSetting(response.data.receive_notifications);
      } catch (error) {
        console.error('Error fetching notification setting', error);
      }
    };

    fetchNotificationSetting();
  }, []);

  const handleToggle = async () => {
    try {
      const response = await axios.patch('http://localhost:8000/api/v1/chargebacks/notification-settings/', {
        receive_notifications: !notificationSetting,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      setNotificationSetting(response.data.receive_notifications);
    } catch (error) {
      console.error('Error updating notification setting', error);
    }
  };

  return (
    <div className="configuration-container">
      <h2>Configuration</h2>
      <div>
        <label>Email Notifications</label>
        <input
          type="checkbox"
          checked={notificationSetting}
          onChange={handleToggle}
        />
      </div>
    </div>
  );
};

export default Configuration;
