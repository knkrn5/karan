import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import AuthButtons from '../../pages/auth/authButtons';

export default function MegaMenu1() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);

  const menuIconRef = useRef<HTMLDivElement>(null);
  const menubuttonRef = useRef<HTMLUListElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        openMenu &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target as Node) &&
        !menubuttonRef.current?.contains(event.target as Node)
      ) {
        setOpenMenu(false);
        setShowMegaMenu(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    //for unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMegaMenu, openMenu]);

  useEffect(() => {
    const handleResize = () => {
      setShowMegaMenu(false);
      setOpenMenu(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showMegaMenu]);

  return (
    <header>
      <div className="bg-white dark:bg-dark">
        <div className="relative flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="flex items-center w-full py-4" title="Home">
              <img src="/favicons/K.svg" className="h-10" alt="Karan-Logo" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
                aran
              </span>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <label className="absolute right-4 top-1/2 block -translate-y-1/2 lg:hidden">
                <div
                  className="w-9 h-9 cursor-pointer flex flex-col items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
                  ref={menuIconRef}
                >
                  <input
                    title="menu"
                    className="hidden peer"
                    type="checkbox"
                    checked={openMenu}
                    onChange={() => setOpenMenu(!openMenu)}
                  />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg] dark:bg-white" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden dark:bg-white" />
                  <div className="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg] dark:bg-white" />
                </div>
              </label>

              <nav
                id="navbarCollapse"
                className={`absolute z-10 right-4 top-full w-full max-w-[300px] rounded-lg bg-gray-200 px-4 py-2 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none dark:bg-dark-2 dark:bg-slate-700 ${
                  !openMenu && 'hidden'
                }`}
              >
                <ul className="block lg:flex" ref={menubuttonRef}>
                  <li className="relative">
                    <NavLink
                      to="/affiliates"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex ${
                          isActive
                            ? 'text-blue-500 dark:text-blue-500'
                            : 'dark:text-gray-300 dark:hover:text-blue-500'
                        }`
                      }
                    >
                      Affiliates
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/resources"
                      className={({ isActive }) =>
                        `flex py-2 text-base font-medium text-black duration-300 hover:text-blue-500 lg:ml-12 lg:inline-flex ${
                          isActive
                            ? 'text-blue-500 dark:text-blue-500'
                            : 'dark:text-gray-300 dark:hover:text-blue-500'
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
                            ? 'text-blue-500 dark:text-blue-500'
                            : 'dark:text-gray-300 dark:hover:text-blue-500'
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
