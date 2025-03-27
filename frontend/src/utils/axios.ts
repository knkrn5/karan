import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// This Axios Interceptor is only handling 401 and 403, rest 400 , 500 with go to the catch block of where we have use this axios api
axiosApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && !error.config._retry) {
      console.log("Refresh token renewing...");
      error.config._retry = true;
      try {
        await axiosApi.post('/api/v1/auth/refresh-token');

        //  Retry the original request with the new token
        const res = await axiosApi.request(error.config);
        return res;
      } catch (refreshError) {
        console.log('Failed to refresh token. Logging out...');
        await axiosApi.post('/api/v1/auth/logout');
        localStorage.removeItem('isSuccessLoginedInLs');
        window.location.reload();
        return Promise.reject(refreshError);
      }
    }

    // Handle Refresh Token Expiry (403)
    if (error.response.status === 403) {
      console.log('Refresh token expired. Logging out...');
      await axiosApi.post('/api/v1/auth/logout');
      // window.location.href = '/login';
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default axiosApi;


