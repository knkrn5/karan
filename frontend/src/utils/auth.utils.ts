import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function verifyExistingUser(email: string) {
  try {
    const verifyExistingUserRes = await axios.post(`${BACKEND_URL}/api/v1/auth/verify-user`, {
      email: email,
    });
    return verifyExistingUserRes;
  } catch (error) {
    return error;
  }
}

export async function sendOpt(userEmail: string) {
  try {
    const sendOptRes = await axios.post(
      `${BACKEND_URL}/api/v1/auth/send-otp`,
      { email: userEmail, reason: 'registration' },
      { withCredentials: true }
    );
    return sendOptRes;
  } catch (error) {
    return error;
  }
}

export async function verifyOpt(email: string, otp: string) {
  try {
    const verifyOptRes = await axios.post(
      `${BACKEND_URL}/api/v1/auth/verify-otp`,
      { userEmail: email, enteredOTP: otp },
      { withCredentials: true }
    );

    return verifyOptRes;
  } catch (error) {
    return error;
  }
}
