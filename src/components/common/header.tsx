import { useState } from "react";
import ThemeMode from "../partials/ui/themeToggle";
import { Link, NavLink } from "react-router";

export default function MegaMenu1() {
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <header>
      <div className="bg-white dark:bg-dark">
        <div className=" relative flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="flex items-center w-full py-4">
              <img src="/favicons/K.svg" className="h-10" alt="Karan Logo" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
                aran
              </span>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <label className="absolute right-4 top-1/2 block -translate-y-1/2  lg:hidden">
                <div className="w-9 h-9 mr-4 cursor-pointer flex flex-col items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-200">
                  <input
                    title="menu"
                    className="hidden peer"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      setIsChecked(!isChecked);
                      setOpen(!open);
                    }}
                  />
                  <div className="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]" />
                </div>
              </label>

              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[300px] rounded-lg bg-gray-200 px-4 py-2 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none dark:bg-dark-2 dark:bg-slate-700 ${
                  !open && "hidden"
                }`}
              >
                <ul className="block lg:flex">
                  <li className="relative">
                    <button
                      onClick={() => setShowMegaMenu(!showMegaMenu)}
                      className={`flex w-full items-center justify-between gap-2 py-2 text-base font-medium text-black duration-300 hover:text-primary lg:ml-12 lg:inline-flex lg:w-auto lg:justify-center dark:text-gray-300 dark:hover:text-white ${
                        showMegaMenu && "text-black dark:text-white"
                      }`}
                    >
                      Projects
                      <span
                        className={`${
                          showMegaMenu ? "-scale-y-100" : ""
                        } duration-200`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`w-full lg:absolute lg:left-0 lg:top-full lg:w-[780px] lg:rounded-xl lg:shadow-lg dark:shadow-gray-700 ${
                        showMegaMenu ? "block" : "hidden"
                      }`}
                    >
                      <div className="rounded-b-xl bg-white p-2 lg:p-8 lg:mt-4 dark:bg-dark">
                        <div className="mb-8">
                          <h4 className="mb-1 text-base font-medium text-dark dark:text-white">
                            Projects
                          </h4>
                          <p className="text-sm text-gray-800 dark:text-gray-300">
                            These are some of my projects.
                          </p>
                        </div>

                        <div className="grid gap-y-2 lg:grid-cols-2 lg:gap-x-5">
                          <Link
                            to="https://wealthpsychology.in"
                            target="_blank"
                            className="group flex flex-col gap-4 rounded-lg p-4 duration-200 hover:bg-gray-200 lg:flex-row dark:hover:bg-white/5"
                          >
                            <div className="text-black dark:text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                              >
                                <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-semibold text-dark duration-200  dark:text-white ">
                                Wealth Psychology
                              </h3>
                              <p className="text-sm text-gray-800 dark:text-gray-300">
                                Teaches about wealth psychology, And Explains
                                different financial concepts.
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="https://explanatorai.site"
                            target="_blank"
                            className="group flex flex-col gap-4 rounded-lg p-4 duration-200 hover:bg-gray-200 lg:flex-row dark:hover:bg-white/5"
                          >
                            <div className="text-black dark:text-white">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 640 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H128c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-semibold text-dark duration-200 dark:text-white ">
                                Explanator AI
                              </h3>
                              <p className="text-sm text-gray-800 dark:text-gray-300">
                                An AI-powered Chatbots website. Different types
                                of chatbots are available.
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex dark:text-gray-300 dark:hover:text-orange-500 ${
                          isActive && "text-blue-500 dark:text-orange-500"
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex dark:text-gray-300 dark:hover:text-orange-500 ${
                          isActive && "text-blue-500 dark:text-orange-500"
                        }`
                      }
                    >
                      Blog
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="pr-16 max-xs:hidden lg:pr-0">
              <ThemeMode />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
