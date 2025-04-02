import axios from 'axios';
import axiosApi from './axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function autoRefreshAccessToken() {
  console.log('function to call the  refresh-token remaining time function');
  try {
    const response = await axiosApi.post(
      `${BACKEND_URL}/api/v1/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    console.log('access token refreshed automatically');
    await isAuthenticated();
    console.log('isAuthenticated called');
    return response;
  } catch (error) {
    console.log(error);
  }
}

function calculateRemainingTime() {
  const isSession = JSON.parse(localStorage.getItem('session') || 'null');

  if (!isSession) {
    console.log('No valid session found');
    return;
  }

  const tokenExpirationTime = new Date(isSession * 1000);
  const currentTime = new Date();

  console.log('token expiration:-', tokenExpirationTime);
  const threeMinBeforeTokenExpiration = tokenExpirationTime.getTime() - 3 * 60 * 1000;
  console.log('three min before', threeMinBeforeTokenExpiration);
  const date = new Date(threeMinBeforeTokenExpiration);
  console.log(date.toUTCString());
  console.log(date.toLocaleString());

  const remainingTime = threeMinBeforeTokenExpiration - currentTime.getTime();
  console.log('remainingTime', remainingTime);
  return remainingTime > 0 ? remainingTime : 0;
}

async function scheduleTokenRefresh() {
  const remainingTime = calculateRemainingTime();

  if (remainingTime !== undefined && remainingTime > 0) {
    console.log(`Token refresh scheduled in ${remainingTime / 1000} seconds.`);
    setTimeout(async () => {
      console.log('Refreshing token now...');
      await autoRefreshAccessToken();
      scheduleTokenRefresh();
    }, remainingTime);
  } else {
    console.log('Token is already expired, refreshing now...');
    autoRefreshAccessToken();
    // scheduleTokenRefresh();
  }
}
scheduleTokenRefresh();

async function isAuthenticated(): Promise<boolean> {
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

/* setInterval(() => {
  console.log('remainingTime function', remainingTime);
  // const timeLeft = new Date(remainingTime);
  // console.log(timeLeft.toLocaleString());
}, 1000); */
