import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/profile/profileStore';
import { useContactInfoStore } from '../../stores/contact/contactMsgStore';
import { FaEyeSlash } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function GetContactMsgFromDb() {
  const [userContactMsgsFromDb, setUserContactMsgsFromDb] = useState<
    [
      {
        message: string;
        createdAt: string;
      }
    ]
  >([
    {
      message: '',
      createdAt: '',
    },
  ]);

  //email from profile store
  const profileEmail = useProfileStore(state => state.email);

  const { setSeeContactMsgFromDb } = useContactInfoStore();

  const getContactMsg = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/contact/message`, { withCredentials: true });
    const data = res.data;
    setUserContactMsgsFromDb(data.data);
  };

  useEffect(() => {
    getContactMsg();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-lg hover:shadow-lg transition-transform duration-300">
      <span className="relative inline-block before:absolute before:inset-0 before:block before:-skew-y-1 before:bg-neutral-700 dark:before:bg-neutral-300">
        <h4 className="relative font-bold text-lg mb-2 text-white dark:text-black ">{profileEmail}</h4>
      </span>
      <div className="h-80 overflow-auto">
        {userContactMsgsFromDb.map((msg, index) => (
          <div
            key={index}
            className="flex flex-col  odd:bg-gray-300 dark:odd:bg-gray-800 even:bg-gray-100 dark:even:bg-gray-700 p-2 shadow  "
          >
            <div className="font-serif text-black dark:text-white">
              {`${index + 1}.`} {msg.message}
            </div>
            <span className="text-xs text-right font-mono font-semibold text-gray-500 block mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white cursor-pointer transition-colors bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
        onClick={prev => setSeeContactMsgFromDb(!prev)}
      >
        hide Messages
        <FaEyeSlash size={20} className="ml-1 -mr-1" />
      </button>
    </div>
  );
}
