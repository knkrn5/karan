import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaKey, FaLock, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiClock, HiDesktopComputer } from 'react-icons/hi';

export default function AccessPassSetter() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storageType, setStorageType] = useState('localStorage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (key.trim() === '' || value.trim() === '') {
      alert('Please provide both key and value.');
      setIsSubmitting(false);
      return;
    }

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    if (storageType === 'localStorage') {
      localStorage.setItem(key, value);
      navigate(location.pathname, { replace: true });
    } else if (storageType === 'sessionStorage') {
      sessionStorage.setItem(key, value);
      navigate(location.pathname, { replace: true });
    }

    setKey('');
    setValue('');
    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            {/* Key Input */}
            <div className="group">
              <label
                htmlFor="key"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                <FaKey className="inline mr-2 text-blue-500" />
                Key
              </label>
              <input
                type="text"
                id="key"
                value={key}
                onChange={e => setKey(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter your key"
                required
              />
            </div>

            {/* Value Input with Password Toggle */}
            <div className="group">
              <label
                htmlFor="value"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                <FaLock className="inline mr-2 text-purple-500" />
                Value
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="value"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your value"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Storage Type Selection */}
            <div>
              <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Storage Type
              </span>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="storageType"
                    value="localStorage"
                    checked={storageType === 'localStorage'}
                    onChange={e => setStorageType(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`
                    flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      storageType === 'localStorage'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                  >
                    <HiDesktopComputer
                      className={`text-2xl mb-2 ${
                        storageType === 'localStorage' ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        storageType === 'localStorage'
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Local Storage
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                      Persistent
                    </span>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="storageType"
                    value="sessionStorage"
                    checked={storageType === 'sessionStorage'}
                    onChange={e => setStorageType(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`
                    flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      storageType === 'sessionStorage'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                  >
                    <HiClock
                      className={`text-2xl mb-2 ${
                        storageType === 'sessionStorage' ? 'text-purple-500' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        storageType === 'sessionStorage'
                          ? 'text-purple-700 dark:text-purple-300'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Session Storage
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                      Temporary
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FaSave className="mr-2" />
                  Save to {storageType === 'localStorage' ? 'Local' : 'Session'} Storage
                </div>
              )}
            </button>
          </form>
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
