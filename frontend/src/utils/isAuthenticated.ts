import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function isAuthenticated() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/auth/authenticateUser`, {
      withCredentials: true,
    });

    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
}

export { isAuthenticated };
