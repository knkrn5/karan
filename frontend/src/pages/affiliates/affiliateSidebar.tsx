import { IoPhonePortraitOutline } from 'react-icons/io5';
import { FaTshirt, FaHome, FaGamepad } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';

export default function AffiliateSidebar() {
  const categories = [
    { name: 'Electronics', icon: IoPhonePortraitOutline, color: 'bg-blue-500' },
    { name: 'Fashion', icon: FaTshirt, color: 'bg-pink-500' },
    { name: 'Home', icon: FaHome, color: 'bg-green-500' },
    { name: 'Sports', icon: FaDumbbell, color: 'bg-orange-500' },
    { name: 'Toys', icon: FaGamepad, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md">
      <div className="flex items-center space-x-1 p-2 mb-2  pb-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
        <BiCategory className="w-5 h-5 text-white" />
        <h3 className="text-xl font-extrabold text-white ">Categories</h3>
      </div>

      <div className="flex flex-col gap-2">
        {categories.map(({ name, icon: Icon, color }) => (
          <button
            key={name}
            type="button"
            onClick={() => console.log(`Filter by ${name}`)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white"
          >
            <span
              className={`p-2 rounded-full text-white ${color} flex items-center justify-center`}
            >
              <Icon size={18} />
            </span>
            <span className="text-md font-medium font-serif">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
