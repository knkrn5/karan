export function BlogSkeletonLoading() {
  return (
    <div className="h-80 w-full sm:w-64 flex flex-col gap-3 rounded-xl shadow-2xl transition-transform duration-300 bg-gray-100 dark:bg-gray-800 overflow-hidden">
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

export function SoloBlogPostSkeletonLoadingTwo() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header - Title */}
      <div className="space-y-3">
        <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

        {/* Author info + date */}
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            <div className="h-3 w-32 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      <div className="h-50 w-full sm:w-[450px] rounded-xl bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

      {/* Lead paragraph */}
      <div className="space-y-2">
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-11/12 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* First heading */}
      <div className="h-8 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

      {/* First paragraph block */}
      <div className="space-y-2">
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-4/5 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* Second image (smaller than featured) */}
      <div className="h-60 w-full rounded-xl bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

      {/* Second heading */}
      <div className="h-8 w-2/5 rounded-lg bg-gray-300 dark:bg-gray-800 animate-pulse"></div>

      {/* Second paragraph block with list-like structure */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-5 w-3/4 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-5 w-4/5 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-5 w-3/4 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        </div>
      </div>

      {/* Code block simulation */}
      <div className="p-4 rounded-lg bg-gray-200 dark:bg-slate-900">
        <div className="space-y-2">
          <div className="h-4 w-2/3 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-4 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-4 w-11/12 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
          <div className="h-4 w-3/4 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        </div>
      </div>

      {/* Final paragraph */}
      <div className="space-y-2">
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-full rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-5 w-2/3 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-20 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-8 w-24 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-8 w-16 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      </div>
    </div>
  );
}
