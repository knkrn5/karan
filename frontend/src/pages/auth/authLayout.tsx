import { Outlet } from "react-router";
// import LoginPage from "./login";
// import Register from './register'

export default function authLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-radial from-gray-300 to-gray-100 dark:from-gray-800 from-40% dark:to-gray-900 p-4">
      <Outlet />
    </div>
  );
}
