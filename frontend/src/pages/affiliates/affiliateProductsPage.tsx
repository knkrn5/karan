import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { LuPackageOpen } from 'react-icons/lu';
import AffiliateSearchAndCart from './affiliateSearchAndCart';
import { AffiliateProductCardSkeletonLoading } from './affiliateSkeletonLoading';
import { useSearchParams } from 'react-router';
import AffiliateProductsPaginations from './affiliateProductsPaginations';
import { useAuthCheck } from '../../hooks/authCheckHook';
import { useMainPopupStore } from '../../stores/popup/mainPopupStore';

const PY_BACKEND_URL = import.meta.env.VITE_PY_BACKEND_URL;

export interface ProductPropsType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  affiliateLink: string;
  category: string;
  subCategory?: string[];
  tags: string[];
  brand: string;
}

const AffiliateProductsPage = () => {
  const [isProcessing, setIsProcessing] = useState<{
    // isFetching: boolean;
    isAddingRemovingCart: boolean;
  }>({ isAddingRemovingCart: false });
  const [expandedDescriptionId, setExpandedDescriptionId] = useState<number | null>(null);

  const [searchParams] = useSearchParams();

  const category: string = searchParams.get('category') ?? '';
  const price: number = parseInt(searchParams.get('price') ?? '1000');
  const searchedProduct: string = searchParams.get('search') ?? '';
  const numberOfProductsToShow: number = parseInt(
    searchParams.get('no_of_products_to_show') ?? '6',
    10
  );

  // react-query client
  const queryClient = useQueryClient();

  //main popup store
  const { setMainPopupMsg } = useMainPopupStore();
  const isAuthChecked = useAuthCheck();

  // using react-query to fetch products with caching and background updates
  const useFetchProducts = () => {
    return useQuery<ProductPropsType[]>({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await axios.get(`${PY_BACKEND_URL}/affiliate-products/get-products`);
        return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    });
  };

  const { data: products = [], isFetching: isFetchingProducts } = useFetchProducts();

  // using react-query to fetch cart items with caching and background updates
  const useFetchCartItems = () => {
    return useQuery<ProductPropsType[]>({
      queryKey: ['cartItems'],
      queryFn: async () => {
        const response = await axios.get(`${PY_BACKEND_URL}/affiliate-products/get-cart-items`, {
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });
  };

  const { data: cartItems = [], isFetching: isFetchingCartItems } = useFetchCartItems();

  const handleCartFunctions = async (product_id: number): Promise<void> => {
    if (!isAuthChecked) {
      setMainPopupMsg('Please Login to add to cart.');
      return;
    }

    setIsProcessing(prev => ({ ...prev, isAddingRemovingCart: true }));

    try {
      if (cartItems.some(item => item.id === product_id)) {
        const res = await axios.delete(`${PY_BACKEND_URL}/affiliate-products/remove-from-cart`, {
          data: { product_id },
          withCredentials: true,
        });
        console.log(res.data);
        queryClient.setQueryData<ProductPropsType[]>(['cartItems'], prevCartItems =>
          prevCartItems ? prevCartItems.filter(item => item.id !== product_id) : []
        );
      } else {
        await axios.post(
          `${PY_BACKEND_URL}/affiliate-products/add-to-cart`,
          { product_id },
          { withCredentials: true }
        );
        const productToAdd = products.find(product => product.id === product_id);
        if (productToAdd) {
          queryClient.setQueryData<ProductPropsType[]>(['cartItems'], prevCartItems =>
            prevCartItems ? [...prevCartItems, productToAdd] : [productToAdd]
          );
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Cart error:', error.response?.data);
      } else {
        console.error('Unexpected cart error:', error);
      }
    } finally {
      setIsProcessing(prev => ({ ...prev, isAddingRemovingCart: false }));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const isCategoryMatch =
        category === '' || product.category.toLowerCase() === category.toLowerCase();
      const isPriceMatch = price === 1000 || product.price <= price;
      const isSearchMatch =
        searchedProduct === '' ||
        product.name.toLowerCase().includes(searchedProduct.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchedProduct.toLowerCase()) ||
        product.category.toLowerCase().includes(searchedProduct.toLowerCase()) ||
        product.subCategory?.some(subcat =>
          subcat.toLowerCase().includes(searchedProduct.toLowerCase())
        ) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchedProduct.toLowerCase()));

      return isCategoryMatch && isPriceMatch && isSearchMatch;
    });
  }, [products, category, price, searchedProduct]);

  const productsTodisplay = filteredProducts.slice(0, numberOfProductsToShow);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-slate-800 p-4 @container">
      <div className="p-2 mb-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
        <AffiliateSearchAndCart
          products={products}
          cartItems={cartItems}
          handleCartFunctions={handleCartFunctions}
          isProcessing={isProcessing.isAddingRemovingCart}
          isFetchingCartItems={isFetchingCartItems}
        />
      </div>

      <div className="grid max-xs:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.length === 0 && isFetchingProducts ? (
          Array.from({ length: 6 }).map((_, index) => (
            <AffiliateProductCardSkeletonLoading key={index} />
          ))
        ) : (
          <>
            {productsTodisplay.map(product => (
              <div
                key={product.id}
                className="flex flex-col @container/card bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />

                <div className="p-4 flex flex-col flex-grow space-y-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-indigo-500">{product.category}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 bg-gradient-to-br from-neutral-200 via-neutral-100 to-slate-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 rounded-full px-2">
                      {product.brand}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600 dark:text-gray-300 flex-grow cursor-pointer"
                    onClick={() =>
                      setExpandedDescriptionId(prev => (prev === product.id ? null : product.id))
                    }
                  >
                    {product.description.length < 50
                      ? product.description
                      : expandedDescriptionId === product.id
                      ? product.description
                      : `${product.description.slice(0, 50)}...`}
                  </p>

                  <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-2  flex-col @card/sm:flex-row">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      <FaShoppingBag size={16} />
                      Buy Now
                    </a>
                    <button
                      type="button"
                      className={`flex-1 inline-flex items-center justify-center gap-2  border ${
                        cartItems.some(item => item.id === product.id)
                          ? 'border-red-600 text-red-600 hover:bg-red-100'
                          : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      } px-4 py-2 rounded-lg  transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-shimmer`}
                      onClick={() => handleCartFunctions(product.id)}
                      disabled={isProcessing.isAddingRemovingCart}
                    >
                      {cartItems.some(item => item.id === product.id) ? (
                        <>
                          <MdRemoveShoppingCart size={16} />
                          Remove from Cart
                        </>
                      ) : (
                        <>
                          <FaShoppingCart size={16} />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* No products found UI */}
      {!isFetchingProducts && filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          <LuPackageOpen size={50} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-2xl font-extrabold">No Products Found</h2>
        </div>
      )}

      {/* show Less and More */}
      <AffiliateProductsPaginations filteredProducts={filteredProducts} />
    </div>
  );
};

export default AffiliateProductsPage;
