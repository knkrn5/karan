import { Mail, Phone, MapPin } from 'lucide-react';

export default function contactDetails() {
  return (
    // <div className="bg-gradient-to-br from-indigo-50 via-purple-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg duration-300 hover:drop-shadow-2xl">
    <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg duration-300 hover:drop-shadow-2xl">
      <div className="space-y-8">
        <div className="flex items-start space-x-6 rounded-2xl p-1 bg-gray-100 shadow-sm dark:bg-slate-700">
          <div className="flex-shrink-0">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Location</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Delhi, India
              <br />
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-6 rounded-2xl p-1 bg-gray-100 shadow-sm dark:bg-slate-700">
          <div className="flex-shrink-0">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Me</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">mail@karan.email</p>
          </div>
        </div>

        <div className="flex items-start space-x-6 rounded-2xl p-1 bg-gray-100 shadow-sm dark:bg-slate-700">
          <div className="flex-shrink-0">
            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
