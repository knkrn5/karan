import { Outlet } from "react-router";
// import LoginPage from "./login";
// import Register from './register'

export default function authLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Outlet />
    </div>
  );
}
