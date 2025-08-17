import { FaPlus } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoChevronUp } from 'react-icons/io5';
import { useAuthCheck } from '../../hooks/authCheckHook';
import axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CbShowMoreProps {
  setMessages: React.Dispatch<React.SetStateAction<{ role: 'user' | 'system'; content: string }[]>>;
}

export default function CbShowMore({ setMessages }: CbShowMoreProps) {
  //authentication check
  const isAuthenticated = useAuthCheck();

  const handleDeleteChat = async () => {
    if (!isAuthenticated) {
      alert('Login required');
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/chatbot/delete-msgs-from-db`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMessages([]);

      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting chat:', error);
        alert(error.response?.data?.message || 'Failed to delete chat');
      }
    }
  };

  const handleNewChat = () => {
    if (!isAuthenticated) {
      alert('Login required');
      return;
    }
    alert('Coming soon');
  };

  return (
    <div className=" flex flex-col gap-2 w-40 rounded-lg bg-neutral-100 dark:bg-dark shadow-lg overflow-hidden border border-neutral-500 dark:border-slate-700">
      <div className="px-3 py-2 border-b border-slate-700 flex items-center justify-between">
        <span className="text-sm font-medium text-dark dark:text-slate-200">Menu</span>
        <IoChevronUp size={16} className="text-dark dark:text-slate-400" />
      </div>

      <div className="p-1">
        <button
          type="button"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-dark dark:text-slate-200 hover:bg-neutral-300 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          onClick={handleNewChat}
        >
          <FaPlus size={16} className="text-emerald-400" />
          <span>New Chat</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-dark dark:text-slate-200 hover:bg-neutral-300 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          onClick={handleDeleteChat}
        >
          <FaRegTrashAlt size={16} className="text-red-400" />
          <span>Delete Chat</span>
        </button>
      </div>
    </div>
  );
}
