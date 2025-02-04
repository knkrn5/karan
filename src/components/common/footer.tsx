import socialLinks from "../partials/ui/socialLinks";
import ThemeMode from "../partials/ui/themeToggle";

import { Link } from "react-router";

export default function Footer() {

  return (
    <footer className="bg-white shadow dark:bg-dark">
      <hr className=" border-gray-700 sm:mx-auto" />
      <div className=" w-full max-w-screen-xl mx-auto p-4 pb-8">
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <div className="sm:flex sm:items-center sm:justify-between">
              <ThemeMode />
          </div>

          <div className="justify-self-end">
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-700 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>{socialLinks()}</div>
        <hr className="my-3 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-900 -m-1 text-center dark:text-gray-400">
          © 2025 Karan.email . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
