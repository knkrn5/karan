import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import AffiliateSearchAndCart from './affiliateSearchAndCart';
import { AffiliateProductCardSkeletonLoading } from './affiliateSkeletonLoading';

const PY_BACKEND_URL = import.meta.env.VITE_PY_BACKEND_URL;

interface ProductPropsType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  affiliateLink: string;
  category: string;
}

const AffiliateProductsPage = () => {
  const [products, setProducts] = useState<Array<ProductPropsType>>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      setIsFetchingProducts(true);
      const response = await axios.get(`${PY_BACKEND_URL}/get-products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-slate-800 p-4">
      <div className="p-2 mb-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
        <AffiliateSearchAndCart />
      </div>

      {products.length === 0 && !isFetchingProducts ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {isFetchingProducts &&
            Array.from({ length: 6 }).map((_, index) => (
              <AffiliateProductCardSkeletonLoading key={index} />
            ))}

          {products.map(product => (
            <div
              key={product.id}
              className="flex flex-col @container/card bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />

              <div className="p-4 flex flex-col flex-grow space-y-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {product.name}
                </h2>
                <span className="text-sm text-indigo-500">{product.category}</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
                  ${product.price}
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
                    className="flex-1 inline-flex items-center justify-center gap-2 text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition cursor-pointer"
                  >
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AffiliateProductsPage;
