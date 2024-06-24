import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/chargebacks/';
const getChargeback = async (id) => {
  if (!id) {
    console.error('No ID provided for getting chargeback details');
    return;
  }
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch chargeback details:', error);
    throw error;
  }
};
const updateChargeback = async (id, chargebackData) => {
  const API_URL = `http://127.0.0.1:8000/api/v1/chargebacks/${id}/edit/`;
  try {
      const response = await axios.put(API_URL, chargebackData); // Use axios.put and send data
      return response.data; // Handle response appropriately
  } catch (error) {
      console.error('Failed to edit chargeback:', error);
      throw error; // Rethrow or handle error appropriately
  }
};




const getChargebacks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


// In your chargebackService or similar file where API requests are made
 
const createChargeback  = async (chargebackData, token) => {
  const url = 'http://localhost:8000/api/v1/chargebacks/';
  try {
    const response = await axios.post(url, chargebackData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to save chargeback:', error.response?.data || 'Server error');
    throw error;
  }
};



// Assuming token is stored in local storage or context and passed to this function
const addCommentToChargeback = async (chargebackId, commentData, token) => {
  console.log("Sending comment data:", commentData);  // This will show you what data is actually being sent
  try {
      const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/comments`, 
          commentData,
          {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          }
      );
      return response.data;
  } catch (error) {
      console.error('Failed to add comment:', error.response?.data || error.message);
      throw error;
  }
};










 const updateChargebackStatus = async (chargebackId, newStatus) => {
  const url = `http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/update-status/`;
  const data = { status: newStatus };
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
      const response = await axios.patch(url, data, { headers });
      return response.data;
  } catch (error) {
      console.error('Failed to update status:', error.response || error);
      throw error;
  }
};

// services/chargebackService.js


// services/chargebackService.js

// services/chargebackService.js


// services/chargebackService.js


const BASE_URL = 'http://127.0.0.1:8000/api/v1/chargebacks';
export const toggleChargebackActive = async (chargebackId) => {
  const url = `${BASE_URL}/${chargebackId}/ac_des/`;  // Update to the correct endpoint
  try {
    const response = await axios.patch(url);
    return response.data; // Assuming response contains the updated "is_active" status
  } catch (error) {
    console.error('Failed to toggle chargeback active status:', error);
    throw error;
  }
};


const deleteChargeback = async (chargebackId) => {
  const API_URL = `http://127.0.0.1:8000/api/v1/chargebacks/delete/${chargebackId}/`;
  try {
      const token = localStorage.getItem('accessToken'); // Retrieve the auth token if required
      const response = await axios.delete(API_URL, {
          headers: {
              'Authorization': `Bearer ${token}` // Include the authorization header if needed
          }
      });
      return response.data; // Return response data for further processing
  } catch (error) {
      console.error('Failed to delete chargeback:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error to be handled by the caller
  }
};

const getChargebackComments = async (chargebackId, token) => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/chargebacks/${chargebackId}/comments`,
          {
              headers: {
                  'Authorization': `Bearer ${token}`  // Correct header for JWT
              }
          }
      );
      return response.data;
  } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
  }
};

const getChargebackFiles = async ({chargebackId}) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/v1/chargebacks/${{chargebackId}}/files/`);
  return response.data;
};



export const uploadChargebackFile = async (chargebackId, fileData) => {
    const url = `${API_URL}${chargebackId}/files/`;
    try {
        const response = await axios.post(url, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to upload file:', error);
        throw error;
    }
};



export {
  getChargebacks,
  updateChargebackStatus ,
  getChargeback,
  createChargeback,
  updateChargeback,
  deleteChargeback,
  getChargebackComments,
  addCommentToChargeback,
  getChargebackFiles,
};
