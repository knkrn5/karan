import { useEffect, useState } from 'react';
import type { BlogPostPropsType } from './blogPage';
import { useSearchParams } from 'react-router';

const POSTS_PER_PAGE = 6;

export default function BlogPaginaton({
  blogPosts,
  setNumberOfPosts,
}: {
  blogPosts: BlogPostPropsType[];
  setNumberOfPosts: React.Dispatch<React.SetStateAction<{ start: number; end: number }>>;
}): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  //   const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const handleBlogPagination = (e: React.MouseEvent<HTMLElement>) => {
    const id = (e.currentTarget as HTMLElement).id;

    setNumberOfPosts(prev => {
      let newStart = prev.start;
      let newEnd = prev.end;

      if (id === 'previous') {
        if (prev.start === 0) return prev;
        newStart = prev.start - POSTS_PER_PAGE;
        newEnd = prev.end - POSTS_PER_PAGE;
      } else if (id === 'next') {
        if (prev.end >= blogPosts.length) return prev;
        newStart = prev.start + POSTS_PER_PAGE;
        newEnd = prev.end + POSTS_PER_PAGE;
      } else {
        const pageNumber = parseInt(id, 10);
        newStart = (pageNumber - 1) * POSTS_PER_PAGE;
        newEnd = newStart + POSTS_PER_PAGE;
      }

      setSearchParams({ startNumber: String(newStart), endNumber: String(newEnd) });
      scrollTo({ top: 0, behavior: 'smooth' });
      return { start: newStart, end: newEnd };
    });
  };

  useEffect(() => {
    const startPage = searchParams.get('startNumber') || '0';
    if (startPage === '0') {
      setCurrentPage(1);
    } else if (startPage === '6') {
      setCurrentPage(2);
    } else if (startPage === '12') {
      setCurrentPage(3);
    } else if (startPage >= '18') {
      setCurrentPage('next');
    }
  }, [searchParams]);

  return (
    <nav aria-label="Page navigation example" className="px-2">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li
          id="previous"
          className={`flex items-center justify-center px-4 h-10 leading-tight border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 bg-white dark:bg-gray-800 dark:text-gray-400  '
              : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 cursor-pointer'
          }`}
          onClick={e => {
            handleBlogPagination(e);
          }}
        >
          Previous
        </li>

        {Array.from({ length: 3 }, (_, i) => {
          const pageNum = i + 1;
          return (
            <li
              key={pageNum}
              id={String(pageNum)}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${
                currentPage === pageNum
                  ? 'text-black dark:text-white bg-gray-200 dark:bg-gray-700'
                  : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400'
              }`}
              onClick={handleBlogPagination}
            >
              {pageNum}
            </li>
          );
        })}
        <li
          id="next"
          className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${
            currentPage === 'next'
              ? 'text-black dark:text-white bg-gray-200 dark:bg-gray-700'
              : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400'
          }`}
          onClick={handleBlogPagination}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}
