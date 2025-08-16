import { CiSearch } from 'react-icons/ci';
import { BlogPostPropsType } from './blogPostsPage';
import { useEffect, useRef, useState } from 'react';

export default function BlogSearchAndCategory({
  searchOrCategoryValue,
  blogPosts,
  setNumberOfPosts,
  setSearchOrCategoryValue,
}: Readonly<{
  searchOrCategoryValue: string;
  blogPosts: BlogPostPropsType[];
  setNumberOfPosts: React.Dispatch<React.SetStateAction<{ start: number; end: number }>>;
  setSearchOrCategoryValue: React.Dispatch<React.SetStateAction<string>>;
}>) {
  const [showBlogsSearchSuggestions, setShowBlogsSearchSuggestions] = useState<boolean>(false);
  const [showBlogCategories, setShowBlogCategories] = useState<boolean>(false);

  const searchBlogRef = useRef<HTMLInputElement>(null);
  const blogCategoriesRef = useRef<HTMLDivElement>(null);

  function handleblogSearch(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) {
    setNumberOfPosts({ start: 0, end: 6 });
    setSearchOrCategoryValue(e.target.value);
  }

  const matchingBlogPosts = blogPosts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    const catMatch = post.category?.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    const tagMatch = post.tags.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    return titleMatch || catMatch || tagMatch;
  });

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      if (!blogCategoriesRef.current?.contains(target) && showBlogCategories) {
        setShowBlogCategories(false);
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchBlogRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showBlogCategories]);

  return (
    <div className="relative flex  gap-3">
      <div className="relative">
        <input
          type="text"
          title="Search Blog (Ctrl + K)"
          ref={searchBlogRef}
          placeholder="Search Blog"
          value={searchOrCategoryValue}
          onChange={handleblogSearch}
          className="w-100 max-xs:w-full p-2 pr-10 rounded-lg duration-300 transition-shadow shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-gray-200 outline-none"
          onFocus={() => setShowBlogsSearchSuggestions(true)}
          onBlur={() => setTimeout(() => setShowBlogsSearchSuggestions(false), 150)}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 my-auto size-8 text-gray-700 dark:text-gray-300">
          <CiSearch />
        </div>

        {/* blogs Search Suggestions */}
        {showBlogsSearchSuggestions && matchingBlogPosts.length > 0 && (
          <div className="absolute z-10 p-2  w-full bg-white dark:bg-slate-800 rounded-lg shadow shadow-neutral-300 dark:shadow-gray-900 max-h-60 overflow-y-auto">
            {matchingBlogPosts.map((post, index) => (
              <button
                type="button"
                className="flex w-full items-center justify-between px-2 py-2 text-sm text-left text-gray-700 font-bold  dark:text-gray-300 rounded-lg hover:border-b hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                key={index}
                onMouseDown={() => setSearchOrCategoryValue(post.title)}
              >
                {post.title.length < 35 ? post.title : post.title.slice(0, 35) + '...'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="relative" ref={blogCategoriesRef}>
          <button
            type="button"
            className="w-full p-2 pr-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-2xl border border-gray-400 hover:shadow-xl cursor-pointer"
            onClick={() => setShowBlogCategories(!showBlogCategories)}
          >
            Category
          </button>
          <div
            className={`absolute z-10 flex flex-col items-center px-2 text-gray-700 dark:text-gray-300 rounded-lg bg-neutral-50 dark:bg-gray-700 ${
              showBlogCategories ? 'scale-y-100' : 'scale-y-0'
            } origin-top duration-300 transition-transform`}
          >
            {['AI', 'Finance'].map((category, index) => (
              <button
                type="button"
                key={index}
                className="w-full p-2 pr-10 shadow-2xl border-b hover:shadow-xl hover:bg-neutral-300 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 cursor-pointer"
                onClick={() => {
                  setSearchOrCategoryValue(category);
                  setShowBlogCategories(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
