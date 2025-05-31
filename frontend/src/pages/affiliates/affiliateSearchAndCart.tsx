import { HiOutlineShoppingCart } from 'react-icons/hi';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function AffiliateSearchAndCart() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchedProduct, setSearchedProduct] = useState<string>('');

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchedProduct);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev.toString());
      if (searchedProduct.trim() === '') {
        params.delete('search');
      } else {
        params.set('search', searchedProduct.trim());
      }
      return params;
    });
  }, [searchedProduct, setSearchParams]);

  return (
    <div className="relative flex justify-between  gap-3">
      <div className="relative">
        <input
          type="text"
          title="search product"
          placeholder="Search Products..."
          onChange={e => setSearchedProduct(e.target.value)}
          value={searchedProduct}
          className="w-full p-2 sm:pr-30 rounded-lg duration-300 transition-shadow shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-gray-200 outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 my-auto size-8 text-gray-700 dark:text-gray-300">
          <CiSearch />
        </div>
      </div>
      <div className="relative">
        <button
          title="cart"
          type="button"
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="group bg-neutral-200 dark:bg-slate-800 rounded-full p-2 text-white flex items-center justify-center cursor-pointer transition-transform outline-1 duration-300"
        >
          <HiOutlineShoppingCart
            size={25}
            className={`text-black dark:text-white group-hover:scale-x-[-1] duration-300 transition-transform ${
              isCartOpen ? 'scale-x-[-1]' : ''
            }`}
          />
        </button>

        <div
          className={`absolute right-0 top-full mt-2 w-64 h-100 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 z-10  ${
            isCartOpen ? 'scale-y-100' : 'scale-y-0'
          }  duration-300 transition-transform origin-top`}
        >
          cart products
        </div>
      </div>
    </div>
  );
}
