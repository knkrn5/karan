export default function heroSection() {
  return (
    <div className="flex items-center h-[200px] justify-center w-full bg-conic from-white via-neutral-600 to-white to-100% dark:from-slate-600 dark:via-slate-900  dark:to-gray-600  dark:to-100%">
      <div className="text-center text-6xl font-bold  italic leading-none ">
        <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-gray-700 dark:before:bg-slate-900">
          <span className="relative text-gray-200 dark:text-gray-300">Protfolio</span>
        </span>
        <div className="relative w-[5px] mx-auto before:content-[''] before:absolute before:w-[5px] before:h-17 before:top-1 before:left-1/2 before:-translate-x-1/2 before:bg-gray-400 dark:before:bg-gray-400 dark:before:shadow-sky-950"></div>
      </div>
    </div>
  );
}
