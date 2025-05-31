import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ProductPropsType } from './affiliateProductsPage';

export default function AffiliateProductsPaginations({
  filteredProducts,
}: Readonly<{
  filteredProducts: ProductPropsType[];
}>): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const startNumber = parseInt(searchParams.get('startNumber') ?? '0');

  const startPagination = 0;
  const currentPage = startNumber / 6 + 1;
  const totalPages = filteredProducts.length ? Math.ceil(filteredProducts.length / 6) : 1;
  const per_pagination = 5;
  const productsPerPage = 6;

  function handleAffiliateProductsPagination(e: React.MouseEvent<HTMLElement>) {
    const id = (e.currentTarget as HTMLElement).id;
    const newStart = (Number(id) - 1) * productsPerPage;
    const newEnd = newStart + productsPerPage;
    setSearchParams(prev => {
      const params = new URLSearchParams(prev.toString());
      params.set('startNumber', String(newStart));
      params.set('endNumber', String(newEnd));
      return params;
    });
  }

  useEffect(() => {
    const startNumberOnUrl = Number(searchParams.get('startNumber') ?? '0');
    const endNumberOnUrl = Number(searchParams.get('endNumber') ?? '6');
    setSearchParams(prev => {
      const params = new URLSearchParams(prev.toString());
      params.set('startNumber', String(startNumberOnUrl));
      params.set('endNumber', String(endNumberOnUrl));
      return params;
    });
  }, [searchParams, setSearchParams]);

  return (
    <nav aria-label="blog pagination" className="px-2">
      <ul className="inline-flex -space-x-px text-base h-10">
        <button
          type="button"
          id="previous"
          className={`flex items-center justify-center px-4 h-10 leading-tight border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 bg-white dark:bg-gray-800 dark:text-gray-400  '
              : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 cursor-pointer'
          }`}
          onClick={e => {
            handleAffiliateProductsPagination(e);
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages })
          .slice(startPagination, startPagination + per_pagination)
          .map((_, i: number) => {
            const pageNum = i + startPagination + 1;
            return (
              <button
                type="button"
                key={pageNum}
                id={String(pageNum)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${
                  currentPage === pageNum
                    ? 'text-black dark:text-white bg-gray-200 dark:bg-gray-700'
                    : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400'
                }`}
                onClick={handleAffiliateProductsPagination}
              >
                {pageNum}
              </button>
            );
          })}

        <button
          type="button"
          id="next"
          className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50 bg-white dark:bg-gray-800 dark:text-gray-400  '
              : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 cursor-pointer'
          }`}
          onClick={handleAffiliateProductsPagination}
        >
          Next
        </button>
      </ul>
    </nav>
  );
}
