import { Outlet } from 'react-router';

export default function authLayout() {
  return (
    <>
      {/* notification popup */}
      <div className="min-h-screen flex items-center justify-center bg-radial from-gray-300 to-gray-100 dark:from-gray-800 from-40% dark:to-gray-900 p-4">
        <Outlet />
      </div>
    </>
  );
}
