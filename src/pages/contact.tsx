import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handling form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-dark">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 pt-4">Contact Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Have a question or want to work together?</p>
      </div>

      <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-8">
        {/* Contact Details Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Location</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Delhi, India<br /></p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
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

            <div className="flex items-start space-x-6">
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

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Email"
              />
            </div>


            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Message Me here..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Send Message
              <Send className="ml-2 -mr-1 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;