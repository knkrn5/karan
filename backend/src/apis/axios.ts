/* import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true, // Required to send cookies
});

// Automatically refresh token when access token expires
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        // 🔥 Automatically call /refresh-token API
        const res = await axios.post('http://localhost:5000/api/v1/auth/refresh-token', {}, {
          withCredentials: true,
        });

        // ✅ Update the Authorization header with new token
        API.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;

        // ✅ Retry the failed request with the new access token
        error.config.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
        return API.request(error.config);
      } catch (refreshError) {
        console.error('Refresh Token Expired. Please login again');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
 */