import { useEffect, useRef, useState } from 'react';
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import { FaFilter } from 'react-icons/fa';
import { Outlet } from 'react-router';
import AffiliateSidebar from './affiliateSidebar';

function AffiliateLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuBarButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
      setOpenMenu(false);
    }

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        openMenu &&
        !sidebarRef.current?.contains(event.target as Node) &&
        !menuBarButtonRef.current?.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [openMenu, isSmallScreen]);

  return (
    <div className={` md:grid md:grid-cols-[250px_1fr] gap-2 bg-neutral-50 dark:bg-slate-900`}>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={` text-black bg-neutral-100 dark:bg-slate-800 dark:text-white transition-transform  ${
          isSmallScreen &&
          ` absolute top-18 h-full max-md:w-[280px] transition-transform duration-500 ease-in-out  z-10 ${
            openMenu ? 'translate-x-0' : '-translate-x-full'
          }`
        }`}
      >
        {/* menu bar button */}
        {isSmallScreen && (
          <button
            type="button"
            title={openMenu ? 'Close menu' : 'Open menu'}
            aria-label={openMenu ? 'Close menu' : 'Open menu'}
            ref={menuBarButtonRef}
            className="absolute w-fit top-0 -right-13 m-1 p-2 rounded-r-lg bg-neutral-200 dark:bg-dark text-black dark:text-white  cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <RiMenuUnfold3Fill
              size={32}
              className={`${openMenu && 'scale-x-[-1] duration-300 transition-transform'} `}
            />
          </button>
        )}
        <div className="flex items-center space-x-1 px-4 border-b border-neutral-500 dark:border-gray-500">
          <FaFilter />
          <h3 className="font-extrabold text-2xl py-2 ">Filters</h3>
        </div>
        <AffiliateSidebar />
      </div>

      {/* Main Content  */}
      <div className=" bg-neutral-100 dark:bg-slate-800 text-white transition-transform h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AffiliateLayout;
