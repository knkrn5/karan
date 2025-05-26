import { IoMenu } from 'react-icons/io5';
import { TbXboxX } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';

function AffiliatesLayout() {
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
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuBarButtonRef.current &&
        !menuBarButtonRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openMenu]);

  return (
    <div className={`md:grid md:grid-cols-[250px_1fr] h-screen  transition-all duration-500`}>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={` bg-white text-black dark:bg-slate-700 dark:text-white transition-transform ${
          isSmallScreen &&
          ` absolute top-18 h-full max-md:w-[280px] transition-transform duration-500 ease-in-out  z-10 ${
            openMenu ? 'translate-x-0' : '-translate-x-full'
          }`
        }`}
      >
        {/* menu bar button */}
        {isSmallScreen && (
          <div
            className="absolute z-20 w-fit m-1 p-2 rounded-2xl bg-black text-white hover:bg-gray-700 duration-500 cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <IoMenu size={32} /> : <TbXboxX size={32} />}
          </div>
        )}

        <div className="relative">Sidebar</div>
      </div>

      {/* Main Content  */}
      <div className=" min-h-screen bg-green-500 text-white transition-all  ">
        {/* menu bar button */}
        {!openMenu && isSmallScreen && (
          <button
            type="button"
            ref={menuBarButtonRef}
            className="absolute z-20 w-fit m-1 p-2 rounded-2xl bg-black text-white hover:bg-gray-700 duration-300 cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <IoMenu size={32} /> : <TbXboxX size={32} />}
          </button>
        )}
        {/* <Outlet /> */}
        main content
      </div>
    </div>
  );
}

export default AffiliatesLayout;
