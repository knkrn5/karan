import React, { useEffect, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import axios from 'axios';

// const API_URL = 'https://karan-2222.onrender.com';
// const API_URL = 'http://localhost:3000';
const API_URL = import.meta.env.VITE_API_URL;



import SeeContactInfo from './seeContactInfo';

interface serverMsgProp {
  name: string;
  email: string;
  message: string;
  id: string;
}

type FormDataProp = Omit<serverMsgProp, 'id'>;

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataProp>({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState<FormDataProp>({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [serverMsg, setServerMsg] = useState<serverMsgProp>({ name: '', email: '', message: '', id: '' });
  const [status, setStatus] = useState<StatusInfoProps>({});

  // robust email regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ContactInfoLs', JSON.stringify(formData));
    setIsLoading(true);

    // Calculate errors synchronously
    const formFieldErrors = {
      name: !formData.name.trim() ? 'Name is required' : formData.name.length < 3 ? 'Name must be at least 3 characters' : '',
      email: !formData.email ? 'Email is required' : !emailRegex.test(formData.email) ? 'Please enter a valid email' : '',
      message: !formData.message.trim() ? 'Message is required' : formData.message.length < 10 ? 'Message must be at least 10 characters' : '',
    };
    setError(formFieldErrors);

    // Check if any errors exist
    const hasErrors = Object.values(formFieldErrors).some((error) => error !== '');
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/contact/message`, formData);
      const { data } = response;

      localStorage.removeItem('ContactInfoLs');

      setIsSuccess(data.success);
      setStatus({ success: data.status });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setServerMsg({ name: data.data.Name, email: data.data.Email, message: data.data.Message, id: data.data._id });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        /*  const isEmpty = (value: serverMsgProp) => value == null || (typeof value === 'object' && Object.keys(value).length === 0);
        if (isEmpty(data?.data)) {
          setServerMsg({ ...serverMsg, ...JSON.parse(localStorage.getItem('ContactInfoLs') || '{}') });
        } */

        setServerMsg(data?.data ?? { ...serverMsg, ...JSON.parse(localStorage.getItem('ContactInfoLs') || '{}') });

        setIsSuccess(data?.success);
        setStatus({ error: data?.status || 'An error occurred' });
      } else {
        setStatus({ error: 'An unexpected error occurred' });
        setServerMsg({ ...serverMsg, ...JSON.parse(localStorage.getItem('ContactInfoLs') || '{}') });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error[name as keyof FormDataProp]) {
      setError((prev) => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    const storedContactInfo = localStorage.getItem('ContactInfoLs');
    if (storedContactInfo) {
      setFormData(JSON.parse(storedContactInfo));
    }
  }, []);


  //component switching
  if (isSubmitted) {
    return <SeeContactInfo name={serverMsg.name} email={serverMsg.email} message={serverMsg.message} id={serverMsg.id} statusInfo={status} isSuccessBool={isSuccess} />;
  }

  return (
      <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg duration-300 hover:drop-shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              // minLength={3}
              maxLength={30}
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Name"
            />
            {error.name && <p className="text-red-600 text-sm">{error.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email<sup className="text-red-500 text-[12px]">*</sup>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Email"
            />
            {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              // minLength={10}
              maxLength={200}
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 p-3 bg-white block w-full outline-none rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Message Me..."
            />
            <div className="flex justify-between">
              {error.message && <p className="text-red-600 text-sm">{error.message}</p>}
              <p className="text-sm text-gray-500 dark:text-gray-400">{formData.message.length}/200 characters</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 -mr-1 h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </div>
  );
}
