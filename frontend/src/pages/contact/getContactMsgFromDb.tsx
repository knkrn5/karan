import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/profile/profileStore';
import { useContactInfoStore } from '../../stores/contact/contactMsgStore';
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

  const { setSeeContactMsgFromDb } = useContactInfoStore();

  const getContactMsg = async () => {
    try {
      setIsGettingUserMsgs(true);
      const res = await axios.get(`${BACKEND_URL}/api/contact/message`, { withCredentials: true });
      const data = res.data;
      setUserContactMsgsFromDb(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUserContactMsgsFromDb([
          { message: error.response?.data.message, createdAt: new Date().toString() },
        ]);
      } else {
        console.log(error);
        if (error instanceof Error) {
          setUserContactMsgsFromDb([{ message: error.message, createdAt: new Date().toString() }]);
        } else {
          setUserContactMsgsFromDb([
            { message: 'An unknown error occurred', createdAt: new Date().toString() },
          ]);
        }
      }
    } finally {
      setIsGettingUserMsgs(false);
    }
  };

  useEffect(() => {
    getContactMsg();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-lg hover:shadow-lg transition-hover duration-300">
      <span className="relative inline-block before:absolute before:inset-0 before:block before:-skew-y-0 before:bg-neutral-600 dark:before:bg-neutral-400">
        <h4 className="relative font-bold text-lg mb-2 text-white dark:text-black ">
          {profileEmail}
        </h4>
      </span>
      <div className="max-h-80 overflow-auto">
        {isGettingUserMsgs ? (
          <SeeContactMsgFromDbSkeletonLoading />
        ) : userContactMsgsFromDb.length === 0 ? (
          <div className="flex flex-col w-full  odd:bg-gray-300 dark:odd:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 p-2 shadow  ">
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
