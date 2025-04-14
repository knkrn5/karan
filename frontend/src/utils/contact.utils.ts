import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendContactMsgCopyEmail(userEmail: string, userMsg: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/contact/send-contact-msg-copy-email`, {
      email: userEmail,
      subject: 'Thank you for contacting Us',
      content: userMsg,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    console.log(error);
    return null;
  }
}
