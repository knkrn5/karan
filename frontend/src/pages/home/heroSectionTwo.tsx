export default function heroSectionTwo() {
    return (
      <div className="flex items-center h-[200px] justify-center w-full bg-radial-[at_55%_75%] from-neutral-800 to-gray-200 dark:from-gray-300 dark:to-slate-900 to-65%">
        <blockquote className="text-center text-6xl font-bold text-gray-100 dark:text-gray-300 italic leading-none">
          Life is short <br></br>
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-gray-200 dark:before:bg-slate-500">
            <span className="relative text-black dark:text-gray-950">Act Now...</span>
          </span>
        </blockquote>
      </div>
    );
  }