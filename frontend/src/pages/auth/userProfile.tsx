import axios from 'axios';
import { useEffect } from 'react';
import { useProfileStore } from '../../stores/auth/authUserProfileStore.js';
import Logout from './logout';

const API_URL = import.meta.env.VITE_API_URL;

interface userDataProps {
  firstName: string;
  lastName: string;
  email: string;
}

export default function UserProfile() {
  const firstName = useProfileStore((state: userDataProps) => state.firstName);
  const lastName = useProfileStore((state: userDataProps) => state.lastName);
  const email = useProfileStore((state: userDataProps) => state.email);

  const { setFirstName, setLastName, setMail } = useProfileStore();

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        //prettier-ignore
        const response = await axios.get( `${API_URL}/api/v1/auth/user/profile`,
          {
            withCredentials: true, 
          }
        );

        const { data } = response;
        setFirstName(data.userdata.firstName);
        setLastName(data.userdata.lastName);
        setMail(data.userdata.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [setFirstName, setLastName, setMail]);

  return (
    <>
      <div className="flex items-center absolute top-15 right-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg duration-300 hover:shadow-2xl px-3">
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <circle cx="50" cy="50" r="40" fill="#6B7280" />
          <text x="50%" y="55%" fontSize="40" fontFamily="Arial, sans-serif" fill="white" textAnchor="middle" dominantBaseline="middle">
            {letter}
          </text>
        </svg>
        <div className="flex-1 mr-6">
          <h2 className="text-lg font-extrabold dark:text-white">
            {firstName?.charAt(0).toUpperCase() + firstName?.slice(1)} {lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
          </h2>
          <p className="text-gray-500 font-serif dark:text-gray-400">{email}</p>
        </div>
        <Logout />
      </div>
    </>
  );
}
