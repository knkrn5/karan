import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { useContactInfoStore } from '../../stores/contact/contactMsgStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import SeeContactMsg from './seeContactMsg';
import { useProfileStore } from '../../stores/profile/profileStore';
import { useAuthCheck } from '../../hooks/authCheckHook';
import Popup from '../../components/popups/popup';
import AuthPopup from '../auth/authPopup';
import { useICnotificationMsgStore } from '../../components/stores/ICnotificationMsgStore';

interface FormDataProp {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [error, setError] = useState<FormDataProp>({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const name = useContactInfoStore(state => state.name);
  const email = useContactInfoStore(state => state.email);
  const message = useContactInfoStore(state => state.message);
  const isSubmitted = useContactInfoStore(state => state.isSubmitted);

  //contact message store data
  const { setIsSuccess, setContactMsgData, setName, setEmail, setIsSubmitted, setContactMsgId } =
    useContactInfoStore();

  //profile store data
  const profileName = useProfileStore(state => state.firstName);
  const profileEmail = useProfileStore(state => state.email);

  //ICnotificationMsgStore
  const { setICnotificationMsg } = useICnotificationMsgStore();

  useEffect(() => {
    if (profileName && profileEmail) {
      setName(profileName);
      setEmail(profileEmail);
    }
  }, [profileName, setName, profileEmail, setEmail]);

  const isAuthenticated = useAuthCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isAuthenticated) {
      setIsPopupOpen(true);
      setIsLoading(false);
      return;
    }

    // storing form data in an object
    const currentFormData = { name, email, message };

    /*     // robust email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; */

    // Calculating errors synchronously
    const formFieldErrors = {
      name: !name.trim()
        ? 'Name is required'
        : name.length < 3
        ? 'Name must be at least 3 characters'
        : '',
      email: !email
        ? 'Email is required'
        : !email.includes('@')
        ? 'Email must contain @ symbol'
        : !email.includes('.')
        ? 'Email must contain a domain extension (e.g., .com)'
        : email.indexOf('@') === 0
        ? 'Email must have a username before @ symbol'
        : email.indexOf('@') === email.length - 1
        ? 'Email must have a domain after @ symbol'
        : email.split('@')[1] && !email.split('@')[1].includes('.')
        ? 'Email domain must include an extension (e.g., .com)'
        : !/^[a-zA-Z0-9._-]+@/.test(email)
        ? 'Email username can only contain letters, numbers, periods, underscores, and hyphens'
        : !/@[a-zA-Z0-9.-]+\./.test(email)
        ? 'Email domain can only contain letters, numbers, periods, and hyphens'
        : !/\.[a-zA-Z]{2,6}$/.test(email)
        ? 'Email must end with a valid domain extension (2-6 letters)'
        : '',
      message: !message.trim()
        ? 'Message can not be empty'
        : message.length < 10
        ? 'Message must be at least 10 characters'
        : '',
    };
    setError(formFieldErrors);

    // Check if any errors exist
    const hasErrors = Object.values(formFieldErrors).some(error => error !== '');
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact/message`, currentFormData);
      const { data } = response;

      // Storing data in zustand store
      setContactMsgData({
        name: data.data.name,
        email: data.data.email,
        message: data.data.message,
      });
      setIsSuccess(data.success);
      setICnotificationMsg({ success: data.message });
      setContactMsgId(data.data._id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsSuccess(error.response?.data?.success || false);
        setICnotificationMsg({ error: error.response?.data?.message || error.message });
      } else {
        setICnotificationMsg({ error: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactMsgData({ [name]: value });

    // Clear error when user starts typing
    if (error[name as keyof FormDataProp]) {
      setError(prev => ({ ...prev, [name]: '' }));
    }
  };

  // component switching
  if (isSubmitted) {
    return <SeeContactMsg />;
  }

  return (
    <div className="relative">
      {/* popup */}
      {isPopupOpen && (
        <Popup
          header="Login Required"
          footer="karan.email"
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          <AuthPopup />
        </Popup>
      )}

      {/* contact form */}
      <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg duration-300 hover:drop-shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength={30}
              value={name}
              onChange={handleChange}
              disabled={isLoading || profileName !== ''}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Name"
            />
            {error.name && <p className="text-red-600 text-sm">{error.name}</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              maxLength={50}
              value={email}
              onChange={handleChange}
              disabled={isLoading || profileEmail !== ''}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Email"
            />
            {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              maxLength={200}
              value={message}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Message Me..."
            />
            <div className="flex justify-between">
              {error.message && <p className="text-red-600 text-sm">{error.message}</p>}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {message.length}/200 characters
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white cursor-pointer transition-colors bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <IoIosSend className="ml-1 -mr-1 h-6 w-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
