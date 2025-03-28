/* import axios from 'axios';

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
      console.log('Refresh token renewing...');
      error.config._retry = true;
      try {
        const refreshTokenResponse = await axiosApi.post('/api/v1/auth/refresh-token');

        console.log("Refresh token renewed ", refreshTokenResponse.data);
        // window.location.reload();

        // axiosApi.defaults.headers.common['Authorization'] = `Bearer ${refreshTokenResponse.data.accessToken}`;


        //  Retry the original request with the new token
        const res = await axiosApi.request(error.config);
        return res;
      } catch (error) {
        console.log('Failed to refresh token. Logging out...');
        // await axiosApi.post('/api/v1/auth/logout');

        // window.location.reload();
        return Promise.reject(error);
      }
    }

    // Handle Refresh Token Expiry (403)
    if (error.response.status === 403) {
      console.log('Refresh token 403 expired. Logging out...');
      // await axiosApi.post('/api/v1/auth/logout');
      // window.location.href = '/login';
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default axiosApi;
 */

//----------------------------------------------
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// This Axios Interceptor is only handling 401 and 403, rest 400, 500 will go to the catch block
axiosApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Prevent infinite loop: Ensure _retry flag is set
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Refresh token renewing...');

      try {
        // Attempt to refresh the token
        const refreshTokenResponse = await axios.post(
          `${BACKEND_URL}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log('Refresh token renewed', refreshTokenResponse.data);

        // Set new access token in headers for future requests
        axiosApi.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${refreshTokenResponse.data.accessToken}`;

        // Retry the original request with the new token
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${refreshTokenResponse.data.accessToken}`;
        // return axiosApi(originalRequest);
        return refreshTokenResponse.data;
      } catch (error) {
        // If refresh token fails (401 or 403), log out
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          console.log( error.response.data.message);
          // window.location.href = '/login';
        } else {
          if (error instanceof Error) {
            console.log('unexpected error occured:', error.message);
          } else {
            console.log('unexpected error occured:', error);
          }
        }

        return Promise.reject(error); //why this is not send full only data error received for service
      }
    }

    // Handle Refresh Token Expiry (403)
    if (error.response.status === 403) {
      console.log('Refresh token expired 403. Redirecting to login...');
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
