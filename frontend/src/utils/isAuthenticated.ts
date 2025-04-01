import axios from 'axios';
import axiosApi from './axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function timetest() {
  console.log('function to call the  refresh-token remaining time function');
  try {
    const response = await axiosApi.post(
      `${BACKEND_URL}/api/v1/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    console.log('access token refreshed automatically');
    return response.data.accessToken;
  } catch (error) {
    console.log(error);
  }
}

const isSession = JSON.parse(localStorage.getItem('session') || 'null');
const tokenExpirationTime = new Date(isSession * 1000);
const currentTime = new Date();

console.log('token expiration:-', tokenExpirationTime);
const fiveMinBeforeTokenExpiration = tokenExpirationTime.getTime() - 5 * 60 * 1000;
console.log('five min before', fiveMinBeforeTokenExpiration);
const date = new Date(fiveMinBeforeTokenExpiration);
console.log(date.toUTCString());
console.log(date.toLocaleString());

const remainingTime = fiveMinBeforeTokenExpiration - currentTime.getTime();
console.log('remainingTime', remainingTime);

setTimeout(timetest, remainingTime);

setInterval(() => {
  const isSession = JSON.parse(localStorage.getItem('session') || 'null');
  const tokenExpirationTime = new Date(isSession * 1000);
  const fiveMinBeforeTokenExpiration = tokenExpirationTime.getTime() - 5 * 60 * 1000;
  const currentTime = new Date();
  const remainingTime = fiveMinBeforeTokenExpiration - currentTime.getTime();
  console.log('remainingTime', remainingTime);
}, 2000);

async function checkSession() {
  try {
    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });
    const { data } = response;
    console.log('isAuthenticated checking: ', data.data);
    localStorage.setItem('session', JSON.stringify(data.data.exp));
    return true;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}

//refresh accesstoken 5 min before
async function refreshAccessToken() {
  const isSession = JSON.parse(localStorage.getItem('session') || 'null');
  try {
    if (!isSession) {
      const response = await checkSession();
      if (!response) {
        return null;
      }
    }

    /*  const tokenExpirationTime = new Date(isSession * 1000);
    console.log('10 min', tokenExpirationTime);
    const currentTime = new Date();
    // Check if the current time is 5 minutes less than the expiration time
    if (currentTime.getTime() >= tokenExpirationTime.getTime() - 5 * 60 * 1000) {
      console.log('Token is about to expire, refreshing the token...');
      const response = await axiosApi.post(
        `${BACKEND_URL}/api/v1/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      console.log('access token refreshed');
      return response.data.accessToken;
    } else {
      console.log('Token is still valid');
    } */
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

async function isAuthenticated(): Promise<boolean> {
  refreshAccessToken();
  try {
    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    // console.log('isAuthenticated checking: ', data.data);
    localStorage.setItem('session', JSON.stringify(data.data.exp));
    console.log('session storage set newone');
    // console.log(new Date(data.data.exp * 1000), new Date());

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('isAuthenticated checking: ', error.response?.status);
      console.error(
        (error.response?.status && error.response?.data) || error.response?.data?.message
      );
    } else {
      console.error('Unexpected error during authentication:', error);
    }
    return false;
  }
}

export { isAuthenticated };
