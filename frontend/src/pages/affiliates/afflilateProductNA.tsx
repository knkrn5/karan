import { BiPackage } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export default function AffiliateProductNA() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon with animation */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
            <BiPackage size={48} className="text-gray-400 dark:text-gray-500 animate-pulse" />
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Not Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Sorry! This product is currently Not Available or has been discontinued. We're working
            to bring it back soon.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            onClick={() => window.close()}
          >
            <AiOutlineArrowLeft size={18} />
            Back to Products
          </button>
        </div>

        {/* Additional info */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact our{' '}
            <a
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
