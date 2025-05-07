import { FaPlus } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoChevronUp } from 'react-icons/io5';
import { useAuthCheck } from '../../hooks/authCheckHook';

export default function CbShowMore() {
  //authentication check
  const isAuthenticated = useAuthCheck();

  const handleClearChat = () => {
    if (!isAuthenticated) {
      alert('Login required');
      return;
    }

    alert('Coming soon');
  };

  return (
    <div className=" flex flex-col gap-2 w-56 rounded-lg bg-neutral-100 dark:bg-dark shadow-lg overflow-hidden border border-neutral-500 dark:border-slate-700">
      <div className="px-3 py-2 border-b border-slate-700 flex items-center justify-between">
        <span className="text-sm font-medium text-dark dark:text-slate-200">Menu</span>
        <IoChevronUp size={16} className="text-dark dark:text-slate-400" />
      </div>

      <div className="p-1">
        <button
          type="button"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-dark dark:text-slate-200 hover:bg-neutral-300 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          onClick={handleClearChat}
        >
          <FaPlus size={16} className="text-emerald-400" />
          <span>New Chat</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-dark dark:text-slate-200 hover:bg-neutral-300 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          onClick={handleClearChat}
        >
          <FaRegTrashAlt size={16} className="text-red-400" />
          <span>Delete Chat</span>
        </button>
      </div>
    </div>
  );
}
