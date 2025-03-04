import { useState } from "react";
import { Link, NavLink } from "react-router";
import { TbMessageChatbot } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import AuthButtons from "../../pages/auth/authButtons";


/* interface authButtonProps {
  username: string;
  isSignedIn: boolean;
} */

export default function MegaMenu1() {
  const [open, setOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);


  return (
    <header>
      <div className="bg-white dark:bg-dark">
        <div className=" relative flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="flex items-center w-full py-4" title="Home">
              <img src="/favicons/K.svg" className="h-10" alt="Karan Logo" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
                aran
              </span>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <label className="absolute right-4 top-1/2 block -translate-y-1/2  lg:hidden">
                <div className="w-9 h-9 mr-4 cursor-pointer flex flex-col items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
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
                  <div className="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg] dark:bg-white" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden dark:bg-white" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg] dark:bg-white" />
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
                        showMegaMenu && "text-black underline dark:text-white"
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
                              <AiOutlineDollarCircle className="h-6 w-6" />
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
                              <TbMessageChatbot className="h-6 w-6" />
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
                      to="/resources"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex ${
                          isActive
                            ? "text-blue-500 dark:text-blue-500"
                            : "dark:text-gray-300 dark:hover:text-blue-500"
                        }`
                      }
                    >
                      Resources
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex ${
                          isActive
                            ? "text-blue-500 dark:text-blue-500"
                            : "dark:text-gray-300 dark:hover:text-blue-500"
                        }`
                      }
                    >
                      Blog
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="pr-16 lg:pr-0">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
