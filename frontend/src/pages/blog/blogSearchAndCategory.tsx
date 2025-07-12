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

  const searchBlogRef = useRef<HTMLInputElement>(null);

  function handleblogSearch(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) {
    setNumberOfPosts({ start: 0, end: 6 });
    setSearchOrCategoryValue(e.target.value);
  }

  const matchingblogPosts = blogPosts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    const catMatch = post.category?.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    const tagMatch = post.tags.toLowerCase().includes(searchOrCategoryValue.toLowerCase());
    return titleMatch || catMatch || tagMatch;
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchBlogRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex  gap-3">
      <div className="relative">
        <input
          type="text"
          title="search"
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
        {showBlogsSearchSuggestions && (
          <div className="absolute z-10 p-2  w-full bg-white dark:bg-slate-800 rounded-lg shadow shadow-neutral-300 dark:shadow-gray-900 max-h-60 overflow-y-auto">
            {matchingblogPosts.map((post, index) => (
              <div
                className="flex items-center justify-between rounded-lg hover:border-b hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                key={index}
              >
                <button
                  type="button"
                  className="px-2 py-2 text-sm text-left text-gray-700 font-bold  dark:text-gray-300 cursor-pointer"
                  onMouseDown={() => setSearchOrCategoryValue(post.title)}
                >
                  {post.title.length < 35 ? post.title : post.title.slice(0, 35) + '...'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <select
          name="category"
          title="category"
          id="blog-category"
          onChange={handleblogSearch}
          defaultValue="All-Category"
          className="w-full p-2 pr-10 rounded-lg shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none appearance-none"
        >
          <option value="All-Category" className="text-gray-400 dark:text-gray-400">
            All Category
          </option>
          <option value="ai">AI</option>
          <option value="finance">Finance</option>
        </select>
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
