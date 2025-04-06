export default function BlogSearchAndCategory({
  setNumberOfPosts,
  setSearchOrCategoryValue,
}: {
  setNumberOfPosts: React.Dispatch<React.SetStateAction<{ start: number; end: number }>>;
  setSearchOrCategoryValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleblogSearch(
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) {
    setNumberOfPosts({ start: 0, end: 6 });
    setSearchOrCategoryValue(e.target.value);
  }
  return (
    <div className="relative flex  gap-3">
      <div className="relative">
        <input
          type="text"
          title="search"
          placeholder="Search Blog"
          onChange={handleblogSearch}
          className="w-full p-2 sm:pr-30 rounded-lg duration-300 transition-shadow shadow-2xl border border-gray-400 hover:shadow-xl focus:shadow-xl bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-gray-200 outline-none"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 my-auto size-8 text-gray-700 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
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
