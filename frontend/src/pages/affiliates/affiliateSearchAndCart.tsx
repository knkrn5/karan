import { HiOutlineShoppingCart } from 'react-icons/hi';
import { CiSearch } from 'react-icons/ci';
import { FaTrashAlt } from 'react-icons/fa';
import { RiShoppingBag4Fill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import type { ProductPropsType } from './affiliateProductsPage';
import { FiLogIn } from 'react-icons/fi';
import { useAuthCheck } from '../../hooks/authCheckHook';
import { AffiliateCartItemSkeletonLoading } from './affiliateSkeletonLoading';

export default function AffiliateSearchAndCart({
  products,
  cartItems,
  handleCartFunctions,
  isProcessing,
  isFetchingCartItems,
}: Readonly<{
  products: ProductPropsType[];
  cartItems: ProductPropsType[];
  handleCartFunctions: (product_id: number) => void;
  isProcessing: boolean;
  isFetchingCartItems: boolean;
}>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchedProduct, setSearchedProduct] = useState<string>(searchParams.get('search') ?? '');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const cartIconRef = useRef<HTMLButtonElement>(null);
  const cartContainerRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = useAuthCheck();

  function handleOutsideClick(e: MouseEvent): void {
    if (
      cartContainerRef.current?.contains(e.target as Node) ||
      cartIconRef.current?.contains(e.target as Node)
    )
      return;
    setIsCartOpen(false);
  }

  const matchingProductNames = products
    .filter(product => product.name.toLowerCase().includes(searchedProduct.trim().toLowerCase()))
    .map(product => product.name);

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

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
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
          onFocus={() => setShowSearchSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 150)}
          value={searchedProduct}
          className="w-full p-2 sm:pr-30 rounded-lg duration-300 transition-shadow shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-gray-200 outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 my-auto size-8 text-gray-700 dark:text-gray-300">
          <CiSearch />
        </div>
        {showSearchSuggestions &&
          searchedProduct.trim().length > 0 &&
          matchingProductNames.length > 0 && (
            <div className="absolute z-10 p-2  w-full bg-white dark:bg-slate-800 rounded-lg shadow shadow-neutral-300 dark:shadow-gray-900 max-h-60 overflow-y-auto">
              {matchingProductNames.map((name, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 font-bold rounded-lg dark:text-gray-300 hover:border-b hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                  onMouseDown={() => setSearchedProduct(name)}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
      </div>

      {/* cart  Icon */}
      <div className="relative">
        <button
          ref={cartIconRef}
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
          {cartItems.length > 0 && (
            <span className="absolute top-2 right-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full text-white text-xs font-mono flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Cart Items */}
        <div
          ref={cartContainerRef}
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
            {/* login Msg */}
            {!isAuthenticated && (
              <div className={`  bottom-[40%] right-2 mt-2`}>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg  max-w-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                      <FiLogIn className="mr-2 h-5 w-5 text-blue-500" />
                      Login Required
                    </h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Please login to view Cart Items
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={'/login'}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                    >
                      <FiLogIn className="mr-2 h-4 w-4" />
                      Log In
                    </Link>
                    <Link
                      to={'/signup'}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            {cartItems.length === 0 && !isFetchingCartItems && isAuthenticated ? (
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
                        <span className="flex gap-1 items-center">
                          <RiShoppingBag4Fill />
                          Buy Now
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCartFunctions(item.id)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        <span className="flex gap-1 items-center">
                          <FaTrashAlt />
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isFetchingCartItems &&
              Array(3)
                .fill(null)
                .map((_, i) => <AffiliateCartItemSkeletonLoading key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
