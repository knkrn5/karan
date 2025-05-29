export function AuthButtonsSkeletonLoading() {
  return (
    <div className="animate-pulse p-2 flex gap-1 bg-gray-300 dark:bg-gray-700 rounded-lg">
      <div className="h-5 w-25 rounded  bg-gray-400 dark:bg-gray-800 "></div>
      <div className="h-5 w-5 rounded-full bg-gray-400 dark:bg-gray-800"></div>
    </div>
  );
}
