import axios from 'axios';
import { useEffect } from 'react';
import Logout from './logout';
import { Link } from 'react-router';
import { useProfileStore } from '../../stores/auth/profileStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface userDataProps {
  firstName: string;
  lastName: string;
  email: string;
}

export default function UserAccount() {
  const firstName = useProfileStore((state: userDataProps) => state.firstName);
  const lastName = useProfileStore((state: userDataProps) => state.lastName);
  const email = useProfileStore((state: userDataProps) => state.email);

  const { setFirstName, setLastName, setMail } = useProfileStore();

  const letter: string = firstName?.[0]?.toUpperCase() || '';

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/profile/details`, {
          withCredentials: true,
        });

        const { data } = response;
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setMail(data.data.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserAccount();
  }, [setFirstName, setLastName, setMail]);

  return (
    <>
      <div className="flex items-center absolute top-15 right-5 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg duration-300 hover:shadow-2xl px-3">
        <Link to="/profile" className="mr-2 hover:scale-110 duration-300 cursor-pointer">
          <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <title>Profile</title>

            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#6B7280" stopOpacity="1" />
                <stop offset="100%" stopColor="#4A5568" stopOpacity="1" />
              </radialGradient>
              <filter id="shadow">
                <feDropShadow
                  dx="2"
                  dy="2"
                  stdDeviation="3"
                  floodColor="#000000"
                  floodOpacity="0.3"
                />
              </filter>
            </defs>

            <circle cx="50" cy="50" r="40" fill="url(#gradient)" filter="url(#shadow)" />
            <text
              x="50%"
              y="55%"
              fontSize="40"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {letter}
            </text>
          </svg>
        </Link>

        <div className="flex-1 mr-6">
          <h2 className="text-lg font-extrabold dark:text-white">
            {firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}{' '}
            {lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
          </h2>
          <p className="text-gray-500 font-serif dark:text-gray-400">{email}</p>
        </div>
        <Logout />
      </div>
    </>
  );
}
