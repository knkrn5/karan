import axios from 'axios';
import axiosApi from './axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function refreshAccessToken() {
  try {
    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`);
    console.log('req sent', response.data);
    // return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        (error.response?.status && error.response?.data) || error.response?.data?.message
      );
    } else {
      console.error('Unexpected error during authentication:', error);
    }
    return null;
  }
}

async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        (error.response?.status && error.response?.data) || error.response?.data?.message
      );
    } else {
      console.error('Unexpected error during authentication:', error);
    }

    return false;
  }
}

// export { isAuthenticated };

async function main() {
  await refreshAccessToken(); // This function must complete before proceeding.
  const authenticatedStatus = await isAuthenticated(); // This runs only after fetchUserData() is done.
  console.log('Authenticated:', authenticatedStatus);
  return authenticatedStatus;
}

export default main;
