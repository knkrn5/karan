import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// ✅ Axios Interceptor For Refresh Token
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await axios.post(`${BACKEND_URL}/api/v1/auth/refresh-token`, {}, { withCredentials: true });
      return axiosApi.request(error.config);
    }

    /* if (error.response.status === 403) {
      console.log('Refresh token expired. Logging out...');
      await axios.post(`${API_URL}/api/v1/auth/logout`, {}, { withCredentials: true });
      localStorage.setItem('isSuccessLoginedInLs', 'false');
    } */

    return Promise.reject(error);
  }
);


export default axiosApi;
