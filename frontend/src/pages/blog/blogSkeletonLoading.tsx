export function BlogSkeletonLoading() {
  return (
    <div className="h-80 w-full sm:w-64 flex flex-col gap-3 rounded-xl shadow-2xl hover:-translate-y-1 transition-transform duration-300 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="w-full h-40 rounded-t-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-2 space-y-1">
        <div className="w-3/4 h-7 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 mt-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-3/4 h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-1/2 h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  );
}
