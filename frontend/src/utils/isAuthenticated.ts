import axios from 'axios';
import axiosApi from './axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function autoRefreshAccessToken() {
  try {
    const response = await axiosApi.post(
      `${BACKEND_URL}/api/v1/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    await isAuthenticated();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function calculateRemainingTime(expirationTimestampSession: number | null): number {
  if (!expirationTimestampSession) return 0;

  const tokenExpirationTime = new Date(expirationTimestampSession * 1000);
  const currentTime = new Date();

  const threeMinBeforeTokenExpiration = tokenExpirationTime.getTime() - 3 * 60 * 1000;
/*   console.log('token expiration:-', tokenExpirationTime);
  console.log('three min before', threeMinBeforeTokenExpiration);
  const date = new Date(threeMinBeforeTokenExpiration);
  console.log(date.toLocaleString()); */

  const remainingTime = threeMinBeforeTokenExpiration - currentTime.getTime();
  // console.log(`Token refresh scheduled in ${remainingTime / 1000} seconds.`);
  return remainingTime > 0 ? remainingTime : 0;
}

async function scheduleTokenRefresh() {
  const expirationTimestampSession = JSON.parse(localStorage.getItem('session') || 'null');

  if (!expirationTimestampSession) {
    console.log('No valid session found');
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return;
    }
  }

  const remainingTime = calculateRemainingTime(expirationTimestampSession);

  //pro-active call before the token expires
  if (remainingTime > 0) {
    setTimeout(async () => {
      console.log('Refreshing token now...');
      await autoRefreshAccessToken();
      scheduleTokenRefresh();
    }, remainingTime);
  } else {
    //re-active call if the token is already expired
    const refreshResult = await autoRefreshAccessToken();
    if (refreshResult !== null) {
      scheduleTokenRefresh();
    }
  }
}

scheduleTokenRefresh();

async function isAuthenticated(): Promise<boolean> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    localStorage.setItem('session', JSON.stringify(data.data.exp));

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'isAuthenticated checking: ',
        (error.response?.status && error.response?.data) || error.response?.data?.message
      );
    } else {
      console.error('Unexpected error during authentication:', error);
    }
    localStorage.removeItem('session');
    return false;
  }
}

export { isAuthenticated };
