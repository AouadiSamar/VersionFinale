import React, { useState, useEffect } from 'react';
import AxiosInstance from '../components/Axios';
import './UserProfile.css'; // Assurez-vous de créer ce fichier CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    role_names: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-image-section">
      </div>
      <div className="profile-details-section">
        <h2>Profile Details</h2>
        <div className="detail-row">
          <p><FontAwesomeIcon icon={faUser} className="icon"/><strong>First Name:</strong> {profile.first_name}</p>
          <p><FontAwesomeIcon icon={faUser} className="icon"/><strong>Last Name:</strong> {profile.last_name}</p>
        </div>
        <div className="detail-row">
          <p><FontAwesomeIcon icon={faEnvelope} className="icon"/><strong>Email:</strong> {profile.email}</p>
          <p><FontAwesomeIcon icon={faPhone} className="icon"/><strong>Phone Number:</strong> {profile.phone_number}</p>
        </div>
        <div className="detail-row">
          <p><FontAwesomeIcon icon={faUser} className="icon"/><strong>Role:</strong> {profile.role_names.join(', ')}</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/><strong>Address:</strong> {profile.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
