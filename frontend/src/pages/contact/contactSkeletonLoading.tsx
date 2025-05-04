export function SeeContactMsgFromDbSkeletonLoading() {
  return (
    <div className="flex flex-col gap-2 mt-2 md:px-4 w-[40vw] max-md:w-[80vw]">
      <div className=" rounded-lg bg-gray-300 dark:bg-gray-800 animate-shimmer">
        <div className="h-5 m-2 w-3/4 rounded bg-neutral-300 dark:bg-slate-700 animate-pulse"></div>
        <div className="h-8 m-2 w-1/2 rounded bg-neutral-300 dark:bg-slate-700 animate-pulse"></div>
      </div>
      <div className=" rounded-lg bg-gray-300 dark:bg-gray-800 animate-shimmer">
        <div className="h-8 m-2 rounded bg-neutral-300 dark:bg-slate-700 animate-pulse"></div>
        <div className="h-5 m-2 w-3/4 rounded bg-neutral-300 dark:bg-slate-700 animate-pulse"></div>
        <div className="h-5 m-2 w-1/2 rounded bg-neutral-300 dark:bg-slate-700 animate-pulse"></div>
      </div>
    </div>
  );
}
