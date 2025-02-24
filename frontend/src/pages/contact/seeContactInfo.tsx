import { useState } from 'react';
import StatusNotifications from './StatusNotifications';
import axios from 'axios';

import ContactForm from './contactForm';
import { Loader2, Send, Edit, Save, Trash } from 'lucide-react';

// const API_URL = "https://karan-2222.onrender.com";
const API_URL = import.meta.env.VITE_API_URL;

interface StatusInfoProps {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

interface contactDataProps {
  name: string;
  email: string;
  message: string;
  id: string;
  statusInfo: StatusInfoProps;
  isSuccessBool: boolean;
}

const SeeContactInfo = ({ name, email, message, id, statusInfo, isSuccessBool }: contactDataProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(true);
  const [status, setStatus] = useState<StatusInfoProps>(statusInfo);
  const [messageValue, setMessageValue] = useState(message);
  const [isSuccess, setIsSuccess] = useState<boolean>(isSuccessBool);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [isRequired, setisRequired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{
    edit: boolean;
    delete: boolean;
  }>({
    edit: false,
    delete: false,
  });

  // Editing message
  const handleEdit = async () => {
    if (messageValue.length < 10) {
      setisRequired(true);
      return;
    }
    setisRequired(false);
    if (isEditing) {
      try {
        setIsLoading((prev) => ({ ...prev, edit: true }));
        setStatus({ info: 'Saving changes...' });

        const response = await axios.put(`${API_URL}/api/contact/message`, {
          id,
          message: messageValue,
        });

        const { data } = response;
        setStatus({ success: data.status });
        setIsEdited(data.success);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setStatus({
            error: error.response?.data?.status || 'An unexpected error occurred.',
          });
          setIsEdited(error.response?.data?.success);
        } else {
          setStatus({ error: 'An unexpected error occurred' });
        }
      } finally {
        setIsLoading((prev) => ({ ...prev, edit: false }));
      }
    } else {
      setStatus({ info: 'Editing Message' });
    }
    setIsEditing(!isEditing);
  };

  // Deleting message
  const handleDelete = async () => {
    setStatus({ info: 'Deleting Message...' });

    const toDelete = window.confirm('Are you sure you want to delete this message?');
    if (toDelete) {
      try {
        setIsLoading((prev) => ({ ...prev, delete: true }));
        const response = await axios.delete(`${API_URL}/api/contact/message`, { data: { id } });
        const { data } = response;
        setStatus({ success: data.status });
        setIsSuccess(!data.success);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setStatus({
            error: error.response?.data?.status || 'An unexpected error occurred.',
          });
          setIsSuccess(!error.response?.data?.success);
        } else {
          setStatus({ error: 'An unexpected error occurred' });
        }
      } finally {
        setIsLoading((prev) => ({ ...prev, delete: false }));
      }
    } else {
      setStatus({ warning: 'Message deletion canceled.' });
    }
  };

  //component switching
  if (isResend) {
    return <ContactForm />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-5 rounded-2xl shadow-lg duration-300 hover:drop-shadow-2xl">
      <div
        className={`flex flex-col items-center p-4 rounded-2xl ${
          isSuccess && !isEditing && isEdited
            ? 'shadow-[0_4px_30px_rgba(0,255,0,0.2)]'
            : !isSuccess || (isSuccess && !isEditing && !isEdited)
            ? 'shadow-[0_4px_30px_rgba(255,0,0,0.2)]'
            : 'shadow-[0_4px_30px_rgba(0,0,255,0.2)]'
        }`}
      >
        <h5 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white">{name.toLocaleUpperCase()}</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>

        {isEditing ? (
          <div className="w-full max-w-2xl space-y-2">
            <textarea
              className="w-full h-fit text-sm p-4 m-2 break-all bg-white outline-none rounded-2xl dark:bg-gray-700 dark:text-white disabled:opacity-50"
              title="Edit Message"
              minLength={10}
              maxLength={200}
              placeholder="Message..."
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              disabled={isLoading.edit}
            />
            <div className="flex justify-between items-center text-xs ml-5">
              {isRequired && <p className="text-red-600 ">Min 10 characters required</p>}
              <p className="text-gray-500 dark:text-gray-400 text-right">{messageValue.length}/200 Characters</p>
            </div>
          </div>
        ) : (
          <p className="w-full max-w-2xl text-sm p-4 m-2 break-all bg-white rounded-2xl dark:bg-gray-700 dark:text-white">{messageValue}</p>
        )}

        <div className="flex gap-2 mt-4">
          {isSuccess ? (
            <>
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleEdit}
                disabled={isLoading.edit || isLoading.delete}
              >
                {isLoading.edit ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </>
                )}
              </button>

              <button
                // className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-white rounded-lg border border-red-200 duration-300 hover:bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-700 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-white rounded-lg border border-red-600 duration-300 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-700 dark:bg-gray-800 dark:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={isLoading.edit || isLoading.delete}
              >
                {isLoading.delete ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsResend(true)}
              // className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-white rounded-lg border border-blue-200 duration-300 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:text-white"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-white rounded-lg border border-blue-600 duration-300  focus:ring-4 focus:outline-none hover:bg-blue-700 hover:text-white focus:ring-blue-700 dark:bg-gray-800 dark:text-blue-400 "
              type="button"
            >
              <Send className="h-4 w-4 mr-2" />
              Resend Message
            </button>
          )}
        </div>
      </div>
      <StatusNotifications statusInfo={status} />
    </div>
  );
};

export default SeeContactInfo;
