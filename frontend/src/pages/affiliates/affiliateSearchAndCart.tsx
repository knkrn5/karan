import { HiOutlineShoppingCart } from 'react-icons/hi';

export default function AffiliateSearchAndCart() {
  return (
    <div className="relative flex  gap-3">
      <div className="relative">
        <input
          type="text"
          title="search"
          placeholder="Search Blog"
          //   onChange={handleblogSearch}
          className="w-full p-2 sm:pr-30 rounded-lg duration-300 transition-shadow shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-gray-200 outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 my-auto size-8 text-gray-700 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      <div className="relative">
        <div className="group bg-neutral-200 dark:bg-slate-800 rounded-full p-2 text-white flex items-center justify-center cursor-pointer transition-colors duration-300">
          <HiOutlineShoppingCart
            size={25}
            className="text-black dark:text-white group-hover:scale-x-[-1] duration-300 transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
