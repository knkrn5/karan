import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;

    return data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Authentication Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        details: error.response?.data,
      });
    } else {
      console.error('Unexpected error during authentication:', error);
    }

    return false;
  }
}

export { isAuthenticated };
