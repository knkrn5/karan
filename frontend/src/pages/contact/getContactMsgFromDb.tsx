import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/profile/profileStore';
import { useContactMsgStore } from '../../stores/contact/contactMsgStore';
import { FaEyeSlash } from 'react-icons/fa';
import { SeeContactMsgFromDbSkeletonLoading } from './contactSkeletonLoading';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function GetContactMsgFromDb() {
  const [userContactMsgsFromDb, setUserContactMsgsFromDb] = useState<
    {
      message: string;
      createdAt: string;
    }[]
  >([]);

  const [isGettingUserMsgs, setIsGettingUserMsgs] = useState<boolean>(false);

  //email from profile store
  const profileEmail = useProfileStore(state => state.email);

  const { setSeeContactMsgFromDb } = useContactMsgStore();

  const getContactMsgFromDb = async () => {
    try {
      setIsGettingUserMsgs(true);
      const res = await axios.get(`${BACKEND_URL}/api/contact/message`, { withCredentials: true });
      const data = res.data;

      const messages = data?.data?.messages;

      if (!Array.isArray(messages) || messages.length === 0) {
        setUserContactMsgsFromDb([
          { message: 'No messages found', createdAt: new Date().toString() },
        ]);
      } else {
        setUserContactMsgsFromDb(messages);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUserContactMsgsFromDb([
          { message: error.response?.data.message, createdAt: new Date().toString() },
        ]);
      } else {
        setUserContactMsgsFromDb([
          { message: 'An unknown error occurred', createdAt: new Date().toString() },
        ]);
      }
    } finally {
      setIsGettingUserMsgs(false);
    }
  };

  useEffect(() => {
    getContactMsgFromDb();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-lg hover:shadow-lg transition-hover duration-300">
      <h4 className="relative font-extrabold text-lg mb-2 px-2 rounded-lg shadow-lg text-black dark:text-white bg-linear-to-t from-neutral-300 via-neutral-50 to-neutral-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 ">
        {profileEmail}
      </h4>
      <div className="max-h-80 overflow-auto">
        {isGettingUserMsgs ? (
          <SeeContactMsgFromDbSkeletonLoading />
        ) : userContactMsgsFromDb.length === 0 ? (
          <div className="flex flex-col mt-2 w-[40vw] max-md:w-[80vw] odd:bg-gray-300 dark:odd:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 p-2 shadow  ">
            <div className="font-serif w-full text-black dark:text-white">
              No Messages Available
            </div>
            <span className="text-xs text-right font-mono font-semibold text-gray-500 block mt-1">
              N/A
            </span>
          </div>
        ) : (
          userContactMsgsFromDb.map((msg, index) => (
            <div
              key={index}
              className="flex flex-col  odd:bg-gray-300 dark:odd:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 p-2 shadow border-b border-neutral-500 dark:border-gray-600  "
            >
              <div className="font-serif text-black dark:text-white">
                {`${index + 1}.`} {msg.message}
              </div>
              <span className="text-xs text-right font-mono font-semibold text-gray-500 block mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        className="inline-flex items-center  p-2 mt-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white cursor-pointer transition-colors bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
        onClick={prev => setSeeContactMsgFromDb(!prev)}
      >
        Hide Messages
        <FaEyeSlash size={20} className="ml-1 -mr-1" />
      </button>
    </div>
  );
}
