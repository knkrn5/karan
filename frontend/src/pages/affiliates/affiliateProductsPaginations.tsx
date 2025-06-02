import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ProductPropsType } from './affiliateProductsPage';
import { FaMinus, FaPlus } from 'react-icons/fa6';

export default function AffiliateProductsPaginations({
  filteredProducts,
}: Readonly<{
  filteredProducts: ProductPropsType[];
}>): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const numberOfProductsToShow = 9;

  const [productsToShow, setProductsToShow] = useState<number>(
    parseInt(searchParams.get('no_of_products_to_show') ?? numberOfProductsToShow.toString(), 10)
  );

  function handleShowMoreLess(id: string): void {
    if (id === 'less') {
      setProductsToShow(prev => prev - numberOfProductsToShow);
    } else if (id === 'more') {
      setProductsToShow(prev => prev + numberOfProductsToShow);
    }
  }

  useEffect(() => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev.toString());
      if (productsToShow > 0) {
        params.set('no_of_products_to_show', productsToShow.toString());
      } else {
        params.delete('no_of_products_to_show');
      }
      return params;
    });
  }, [productsToShow, setSearchParams]);

  return (
    <div
      className={`flex justify-center items-center gap-3 w-full mt-4 border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-10 ${
        filteredProducts.length <= numberOfProductsToShow ? 'hidden' : ''
      }`}
    >
      <button
        id="less"
        disabled={productsToShow <= numberOfProductsToShow}
        type="button"
        onClick={e => handleShowMoreLess(e.currentTarget.id)}
        className={`flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 text-gray-700  dark:text-gray-300 rounded-lg hover:border-gray-400 hover:bg-neutral-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 `}
      >
        <FaMinus className="w-4 h-4" />
        Less
      </button>
      <div className="w-px h-6 bg-gray-500 dark:bg-gray-300"></div>
      <button
        type="button"
        id="more"
        onClick={e => handleShowMoreLess(e.currentTarget.id)}
        disabled={filteredProducts.length <= productsToShow}
        className="flex items-center gap-2 px-5 py-2.5 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-600 dark:hover:bg-gray-700 transition-all duration-200 font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        More
        <FaPlus className="w-4 h-4" />
      </button>
    </div>
  );
}
