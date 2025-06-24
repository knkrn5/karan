import axios from 'axios';
import axiosApi from './axios';
import clearBrowserStorage from './browserStorage';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PY_BACKEND_URL = import.meta.env.VITE_PY_BACKEND_URL;
const JAVA_BACKEND_URL = import.meta.env.VITE_JAVA_BACKEND_URL;

async function autoRefreshAccessToken() {
  try {
    const response = await axiosApi.post(
      `${JAVA_BACKEND_URL}/auth/renew-accesstoken`,
      {},
      { withCredentials: true }
    );
    console.log("✅😥🙏🔗 renewed")
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
  console.log('token expiration:-', tokenExpirationTime);
  console.log('three min before', threeMinBeforeTokenExpiration);
  const date = new Date(threeMinBeforeTokenExpiration);
  console.log(date.toLocaleString());

  const remainingTime = threeMinBeforeTokenExpiration - currentTime.getTime();
  console.log(`Token refresh scheduled in ${remainingTime / 1000} seconds.`);
  return remainingTime > 0 ? remainingTime : 0;
}

async function scheduleTokenRefresh(): Promise<void> {
  const expirationTimestampSession = JSON.parse(localStorage.getItem('session') ?? 'null');

  if (!expirationTimestampSession) {
    console.log('No valid session found');
    return;
  }

  const remainingTime = calculateRemainingTime(expirationTimestampSession);

  console.log(remainingTime)

  //pro-active call before the token expires
  if (remainingTime > 0) {
    setTimeout(async () => {
      await autoRefreshAccessToken();
      scheduleTokenRefresh();
    }, remainingTime);
  } else {
    //re-activating call if the token is already expired
    const refreshResult = await autoRefreshAccessToken();
    if (refreshResult !== null) {
      scheduleTokenRefresh();
    }
  }
}

// Pinging Python backend
async function pingpybackend(): Promise<void> {
  try {
    const response = await axios.get(`${PY_BACKEND_URL}/`);
    console.log('api2 status✅:', response.status);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('api2 status❌:', error.response?.status);
    } else {
      console.error('api2 status❌:', error);
    }
  }
}


async function isAuthenticated(): Promise<boolean> {
  clearBrowserStorage();
  pingpybackend();

  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    localStorage.setItem('session', JSON.stringify(data.data.exp));

    scheduleTokenRefresh();

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('isAuthenticated: ', error.response?.data);
    } else {
      console.error('Unexpected error during authentication:', error);
    }
    localStorage.removeItem('session');
    return false;
  }
}

export { isAuthenticated };
