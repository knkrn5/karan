import { RiMenuUnfold3Fill, RiMenuFold3Fill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';

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
    <div
      className={`h-screen md:grid md:grid-cols-[250px_1fr] gap-2 bg-neutral-50 dark:bg-slate-900`}
    >
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`  text-black bg-neutral-100 dark:bg-slate-800 dark:text-white border-y-1 transition-transform ${
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
            className="absolute w-fit top-0 -right-13 m-1 p-2 rounded-r-lg bg-neutral-200 dark:bg-dark text-black dark:text-white "
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <RiMenuUnfold3Fill size={32} /> : <RiMenuFold3Fill size={32} />}
          </button>
        )}

        <h3 className="font-extrabold text-2xl px-4 py-2 border-b border-neutral-500 dark:border-gray-500">
          Filters
        </h3>
      </div>

      {/* Main Content  */}
      <div className=" bg-green-500 text-white transition-transform h-screen overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default AffiliateLayout;
