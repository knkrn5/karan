import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function BrandLoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-72px)]  bg-radial from-gray-300 to-gray-100 dark:from-gray-800 from-40% dark:to-gray-900">
      <img src="/favicons/K.svg" alt="logo" className="animate-pulse duration-500" />
      <AiOutlineLoading3Quarters className="absolute animate-spin size-32 text-gray-400 dark:text-gray-700" />

      {/* <h1 className="absolute bottom-5 text-xl rounded-xl text-blue-400 dark:bg-dark px-5 font-extrabold animate-pulse">
        Karan.email
      </h1> */}
    </div>
  );
}
