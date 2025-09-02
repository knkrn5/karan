import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { FaLock, FaUnlock } from 'react-icons/fa';

export default function UrlAccessPassSetter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageAccessPass, setPageAccessPass] = useState<string>(
    searchParams.get('pageAccessPass') || ''
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (pageAccessPass.trim() === '') {
      alert('Please provide the access password.');
      setIsSubmitting(false);
      return;
    }

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    setSearchParams({ pageAccessPass });

    setPageAccessPass('');
    setIsSubmitting(false);
    if (pageAccessPass !== 'iKnowThisIsVisibleViaDevTool') {
      setPasswordError('Incorrect password, Try again');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 p-4">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Main container */}
        <div className="relative backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl p-8 w-96">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Authentication Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {`Enter the Password to access ${location.pathname.replace('/', '')} page`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Value Input with Password Toggle */}
            <div className="group">
              <label
                htmlFor="value"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                <FaLock className="inline mr-2 text-purple-500" />
                Enter Access Password
              </label>
              <div>
                <input
                  type="password"
                  id="value"
                  autoComplete="off"
                  spellCheck="false"
                  inputMode="text"
                  value={pageAccessPass}
                  onChange={e => {
                    setPageAccessPass(e.target.value);
                    setPasswordError(null);
                  }}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Access Password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl cursor-pointer disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaUnlock className="mr-2" />
                  Access Page
                </div>
              )}
            </button>
          </form>
          {passwordError && (
            <p className=" flex items-center justify-center pr-3 font-bold text-red-500">
              {passwordError}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
