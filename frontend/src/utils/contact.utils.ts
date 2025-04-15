import axios from 'axios';
import { useTRpopupNotificationStore } from '../stores/popup/TRpopupNotificationStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendContactMsgCopyEmail(
  userEmail: string,
  subject: string,
  excerpt: string,
  userMsg: string
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/contact/send-contact-msg-copy-email`, {
      email: userEmail,
      subject,
      excerpt,
      message: userMsg,
    });
    useTRpopupNotificationStore
      .getState()
      .setTRpopupNotificationMsg({ success: response.data.message });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useTRpopupNotificationStore
        .getState()
        .setTRpopupNotificationMsg({ error: error.response?.data.message });
      return error.response?.data;
    }
    console.log(error);
    return null;
  }
}
