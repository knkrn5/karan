import React from 'react';

export function AffiliateProductCardSkeletonLoading() {
  return (
    <div className="flex flex-col bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-3 flex flex-col flex-grow space-y-1">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4  animate-shimmer"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-shimmer"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-shimmer"></div>
        <div className="flex gap-2 mt-1 ">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-shimmer"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
