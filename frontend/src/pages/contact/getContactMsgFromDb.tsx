import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProfileStore } from '../../stores/profile/profileStore';

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

  const getContactMsg = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/contact/message`, { withCredentials: true });
    const data = res.data;
    // console.log(data.data);
    setUserContactMsgsFromDb(data.data);
  };

  useEffect(() => {
    getContactMsg();
  }, []);

  console.log(userContactMsgsFromDb);

  return (
    <div className="p-4 h-100 bg-white rounded-lg hover:shadow-lg overflow-auto">
      <h4 className="font-bold text-lg mb-2 text-center">{profileEmail}</h4>
      {userContactMsgsFromDb.map((msg, index) => (
        <div key={index} className="flex flex-col odd:bg-gray-300 even:bg-gray-100 p-2 shadow ">
          <div className="font-serif">
            {`${index + 1}.`} {msg.message}
          </div>
          <span className="text-xs text-right font-mono font-semibold text-gray-500 block mt-1">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
