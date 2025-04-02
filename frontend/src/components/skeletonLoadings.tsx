export function SmallBoxSkeletonLaoding() {
  return (
    <div className="animate-pulse p-2 bg-gray-300 dark:bg-gray-700 rounded-lg">
      <div className="w-35 h-full space-y-1 animate-pulse">
        <div className="h-3  rounded w-3/4 bg-gray-400 dark:bg-gray-800 "></div>
        <div className="h-3  rounded w-1/2 bg-gray-400 dark:bg-gray-800 "></div>
      </div>
    </div>
  );
}
