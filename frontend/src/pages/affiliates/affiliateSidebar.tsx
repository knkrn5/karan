import { IoPhonePortraitOutline } from 'react-icons/io5';
import { FaTshirt, FaHome, FaGamepad } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaBookOpen } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function AffiliateSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? '');
  const [price, setPrice] = useState(parseInt(searchParams.get('price') ?? '1000'));

  const categories = [
    { name: 'Electronics', icon: IoPhonePortraitOutline, color: 'bg-blue-500' },
    { name: 'Fashion', icon: FaTshirt, color: 'bg-pink-500' },
    { name: 'Home', icon: FaHome, color: 'bg-green-500' },
    { name: 'Books', icon: FaBookOpen, color: 'bg-orange-500' },
    { name: 'Games', icon: FaGamepad, color: 'bg-purple-500' },
  ];

  const clearFilters = () => {
    setSelectedCategory('');
    setPrice(1000);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    // Add category in params object
    if (selectedCategory !== '') {
      params.set('category', selectedCategory.toLowerCase());
    }

    // Adding price in params object
    if (price !== 1000) {
      params.set('price', price.toString());
    }

    // Now adding the params to the URL
    setSearchParams(params.toString());
  }, [selectedCategory, price, setSearchParams]);

  return (
    <div className="p-4 bg-white dark:bg-slate-800 ">
      {/* Active Filters Summary */}
      {(selectedCategory.length > 0 || price !== 1000) && (
        <div className="mb-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Active Filters
            </span>
            <button
              type="button"
              title="Clear all filters"
              aria-label="Clear all filters"
              onClick={clearFilters}
              className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-xs rounded-full">
              {selectedCategory}
            </span>
            {price !== 1000 && (
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-xs rounded-full">
                Under ₹{price}
              </span>
            )}
          </div>
        </div>
      )}

      {/* categories filter */}
      <div className="rounded-xl shadow-md">
        <div className="flex items-center space-x-1 p-2 mb-2  pb-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
          <BiCategory className="w-5 h-5 text-white" />
          <h3 className="text-xl font-extrabold text-white ">Categories</h3>
        </div>

        <div className="flex flex-col gap-2">
          {categories.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedCategory(name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-800 dark:text-white cursor-pointer ${
                selectedCategory === name
                  ? 'bg-gray-300 dark:bg-slate-600 shadow-lg'
                  : 'bg-gray-100 dark:bg-slate-700'
              } `}
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

      {/* price filter */}
      <div className="mt-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-1 p-2 mb-2  pb-2 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg shadow-lg">
          <AiFillDollarCircle className="w-5 h-5 text-white" />
          <h3 className="text-xl font-extrabold text-white ">Price</h3>
        </div>

        {/* <div className="flex flex-col gap-2"></div> */}
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">₹0</span>
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-medium">
              {price === 1000 ? '₹1000+' : `Under ₹${price}`}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">₹1000+</span>
          </div>

          <div className="relative">
            <input
              title="Price range slider"
              aria-label="Price range slider"
              type="range"
              min="0"
              max="1000"
              step="50"
              value={price}
              onChange={e => setPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${
                  price / 10
                }%, #e5e7eb ${price / 10}%, #e5e7eb 100%)`,
              }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full shadow-lg border-2 border-white pointer-events-none"
              style={{ left: `calc(${price / 10}% - 8px)` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Budget</span>
            <span>Premium</span>
          </div>
        </div>
      </div>
      {/* information */}
      <div className="mt-4 p-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-lg text-white text-center">
        <h3 className="text-lg font-bold">Products Promotion</h3>
        <p className="text-sm mt-1">Products I've personally experienced.</p>
      </div>
    </div>
  );
}
