import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  svgIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  notificationMsg: string;
  bgColor: string;
};

const NotificationPopupModel = ({
  isOpen,
  onClose,
  notificationMsg,
  svgIcon,
  bgColor,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-20 right-0 z-50 ">
      <div
        className={`relative  grid grid-cols-[1fr_20px] gap-4 max-w-[400px] bg-white dark:bg-slate-900 drop-shadow-xl shadow-red-500  p-2 m-1 rounded-lg 
        ${!isVisible ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-300`}
      >
        <div
          className={`flex items-center w-fit mx-auto ${bgColor}  text-white px-4 py-2 rounded-lg`}
        >
          {React.createElement(svgIcon, { className: 'mr-2 h-6 w-6' })}
          <p className="font-semibold">{notificationMsg}</p>
        </div>
        <span
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-black bg-gray-300 hover:bg-gray-400  dark:text-gray-300 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-700  rounded-xl duration-300 cursor-pointer"
        >
          <IoMdClose />
        </span>
      </div>
    </div>,
    document.getElementById('popup-modal-root') as HTMLElement
  );
};

export default NotificationPopupModel;

//use this like this ========
/*    <NotificationPopupModel
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          svgIcon={FaCircleXmark}
          notificationMsg="Please log in to send a message."
          bgColor="bg-red-600"
        /> */
