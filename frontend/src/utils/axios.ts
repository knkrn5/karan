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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //to prevent infinite loop
      console.log('Refresh token renewing...');

      try {
        const refreshTokenResponse = await axios.post(
          `${BACKEND_URL}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log('Refresh token renewed', refreshTokenResponse.data);

        //** this is only needed if my logic to refresh the accesstoken is stored any storage that can be accessed from forontend js */
        /* // Seting new access token in headers for future requests
        axiosApi.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${refreshTokenResponse.data.accessToken}`;

        // Retring the original request with the new token
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${refreshTokenResponse.data.accessToken}`; */

        return axiosApi(originalRequest);
      } catch (error) {
        // If refresh token fails (401 or 403), log out
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          console.log(error.response.data.message, 'logging out...');
          // window.location.href = '/login';
          await axios.post(`${BACKEND_URL}/api/v1/auth/logout`, {}, { withCredentials: true });
          // window.location.reload();
        } else {
          if (error instanceof Error) {
            console.log('unexpected error occured:', error.message);
          } else {
            console.log('unexpected error occured:', error);
          }
        }

        return Promise.reject(error); 
      }
    }

    // Handle forbidden (403), but from no where i am sending this 403 error
    /* if (error.response.status === 403) {
      console.log('forbidden 403, logging out...');
    } */

    return Promise.reject(error);
  }
);

export default axiosApi;
