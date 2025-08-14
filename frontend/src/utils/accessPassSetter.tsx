import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AccessPassSetter() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storageType, setStorageType] = useState('localStorage');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (key.trim() === '' || value.trim() === '') {
      alert('Please provide both key and value.');
      return;
    }

    if (storageType === 'localStorage') {
      localStorage.setItem(key, value);
      navigate(location.pathname, { replace: true });
    } else if (storageType === 'sessionStorage') {
      sessionStorage.setItem(key, value);
      navigate(location.pathname, { replace: true });
    }

    // Clear inputs after storing
    setKey('');
    setValue('');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Storage Setter</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="key" className="block text-sm font-medium text-gray-700">
              Key
            </label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={e => setKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter key"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter value"
            />
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700">Storage Type</span>
            <div className="mt-2 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storageType"
                  value="localStorage"
                  checked={storageType === 'localStorage'}
                  onChange={e => setStorageType(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Local Storage</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storageType"
                  value="sessionStorage"
                  checked={storageType === 'sessionStorage'}
                  onChange={e => setStorageType(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Session Storage</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
