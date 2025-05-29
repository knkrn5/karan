
export function CardSkeletonLoadingOne() {
  return (
    <div className="h-80 w-64 flex flex-col gap-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="w-full h-40 rounded-t-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="w-3/4 h-6 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/3 h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonLoadingTwo() {
  return (
    <div className="h-80 w-64 flex flex-col gap-3 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="w-full h-40 rounded-t-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-2 space-y-1">
        <div className="w-3/4 h-7 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 mt-2 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-full h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-3/4 h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="w-1/2 h-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    </div>
  );
}
