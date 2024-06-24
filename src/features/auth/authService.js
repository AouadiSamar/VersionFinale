import axios from "../../components/Axios";

const BACKEND_DOMAIN = "http://localhost:8000";

const authService = {
  login: async (userData) => {
    const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`;
    try {
      const response = await axios.post(LOGIN_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log(localStorage.getItem('accessToken')); // Should print the token
        return { success: true, data: response.data };
      } else {
        console.error('Login successful, but no accessToken received.');
        return { success: false };
      }
    } catch (error) {
      console.error('Login request failed:', error.response || error);
      return { success: false, error: error.response || error };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  activate: async (userData) => {
    const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`;
    const response = await axios.post(ACTIVATE_URL, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
  resetPassword: async (emailData) => {
    const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`;
    const response = await axios.post(RESET_PASSWORD_URL, emailData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  resetPasswordConfirm: async ({ token, newPassword, confirmPassword }) => {
    const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
    const data = {
      token,
      new_password: newPassword,
      re_new_password: confirmPassword,
    };
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  
 


};
export default authService;