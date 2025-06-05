import { HiOutlineShoppingCart } from 'react-icons/hi';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { ProductPropsType } from './affiliateProductsPage';

// const PY_BACKEND_URL = import.meta.env.VITE_PY_BACKEND_URL;

export default function AffiliateSearchAndCart({
  cartItems,
}: Readonly<{ cartItems: ProductPropsType[] }>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchedProduct, setSearchedProduct] = useState<string>(searchParams.get('search') ?? '');

  useEffect(() => {
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
      {/* search */}
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

      {/* cart  Icon */}
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

        {/* Cart Items */}
        <div
          className={`absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-gray-600 p-4 z-10 
    transform transition-transform duration-300 origin-top ${
      isCartOpen ? 'scale-y-100' : 'scale-y-0'
    }`}
        >
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-200">
              🛒 Your Cart
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 mb-4 p-1 py-2 rounded-lg shadow-lg bg-neutral-200 dark:bg-slate-800"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ₹{item.price.toFixed(2)}
                    </p>

                    <div className="mt-2 flex gap-2">
                      <a
                        href={item.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                      >
                        Buy Now
                      </a>
                      <button
                        // onClick={() => handleRemoveFromCart(item.id)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
