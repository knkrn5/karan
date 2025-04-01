import axios from 'axios';
import axiosApi from './axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await axiosApi.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    console.log("isAuthenticated checking: ", data);

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("isAuthenticated checking: ", error.response?.status);
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
