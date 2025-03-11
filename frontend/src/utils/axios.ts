import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// ✅ Axios Interceptor For Refresh Token
axiosApi.interceptors.response.use(
  response => response,
  async error => {
    // ✅ Handle Access Token Expiry (401)
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        // ✅ Use axiosApi (not axios)
        await axiosApi.post('/api/v1/auth/refresh-token');

        // ✅ Retry the original request with the new token
        const res = await axiosApi.request(error.config);
        return res;
      } catch (refreshError) {
        console.log('Failed to refresh token. Logging out...');
        await axiosApi.post('/api/v1/auth/logout');
        localStorage.removeItem('isSuccessLoginedInLs');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // ✅ Handle Refresh Token Expiry (403)
    if (error.response.status === 403) {
      console.log('Refresh token expired. Logging out...');
      await axiosApi.post('/api/v1/auth/logout');
      localStorage.removeItem('isSuccessLoginedInLs');
      window.location.href = '/login';
    }

    // ✅ Reject other errors
    return Promise.reject(error);
  }
);

export default axiosApi;

const logoutAxiosApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

logoutAxiosApi.interceptors.request.use(
  config => {
    // ✅ Check if the user is logged in
    const isSuccessLoginedInLs = localStorage.getItem('isSuccessLoginedInLs');

    // ✅ If token does NOT exist, cancel the request
    if (!isSuccessLoginedInLs) {
      return Promise.reject(new axios.Cancel('Request canceled: No token'));
    }

    // ✅ Otherwise, allow the request
    return config;
  },
  error => {
    // ✅ Handle any request errors
    return Promise.reject(error);
  }
);

export { logoutAxiosApi };
