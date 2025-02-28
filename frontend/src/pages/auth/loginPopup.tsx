import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthButtons() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isLogin ? "Welcome Back!" : "Join Us!"}
        </h2>

        {/* Toggle Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 rounded-full text-sm font-semibold transition duration-200 ${
              isLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 rounded-full text-sm font-semibold transition duration-200 ${
              !isLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Primary Action Button */}
        <button className="w-full py-3 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-200">
          {isLogin ? "Login with Email" : "Sign Up with Email"}
        </button>

        {/* Social Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-2 border rounded-full text-gray-700 hover:bg-gray-100 transition duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-2 border rounded-full text-gray-700 hover:bg-gray-100 transition duration-200">
            <img
              src="https://www.svgrepo.com/show/448234/github.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
