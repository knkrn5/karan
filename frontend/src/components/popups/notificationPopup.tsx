import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { FaCircleCheck, FaCircleInfo, FaCircleXmark, FaCircleExclamation } from 'react-icons/fa6';
import { useNotificationPopupStore } from '../../stores/popup/notificationPopupStore';

const NotificationPopupModel = () => {
  const [isVisibleSlide, setIsVisibleSlide] = useState(false);

  const notificationMsg = useNotificationPopupStore(state => state.notificationMsg);
  const { resetNotificationPopupStore } = useNotificationPopupStore();

  useEffect(() => {
    // Only runing effect if  notification message is present
    if (notificationMsg && Object.keys(notificationMsg).length > 0) {
      setIsVisibleSlide(false);
      setTimeout(() => {
        setIsVisibleSlide(true);
      }, 10);

      const timeout = setTimeout(() => {
        setIsVisibleSlide(false);
        setTimeout(resetNotificationPopupStore, 300);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [notificationMsg, resetNotificationPopupStore]);

  // close popup with exit animation
  const handleClose = () => {
    setIsVisibleSlide(false);
    setTimeout(resetNotificationPopupStore, 300);
  };

  if (!notificationMsg || Object.keys(notificationMsg).length === 0) return null;

  return createPortal(
    <div className="fixed top-20 right-0 z-50 ">
      <div
        className={`relative  grid grid-cols-[1fr_20px] gap-4 max-w-[400px]  drop-shadow-xl shadow-red-500  p-2 m-1 rounded-lg transition-transform duration-300 
        ${!isVisibleSlide ? 'translate-x-full' : 'translate-x-0'} ${
          notificationMsg.success
            ? 'bg-green-600'
            : notificationMsg.error
            ? 'bg-red-600'
            : notificationMsg.warning
            ? 'bg-yellow-600'
            : notificationMsg.info
            ? 'bg-blue-600'
            : ''
        } `}
      >
        <div className={`flex items-center w-fit mx-auto  text-white px-4 py-2 rounded-lg`}>
          {React.createElement(
            notificationMsg.success
              ? FaCircleCheck
              : notificationMsg.error
              ? FaCircleXmark
              : notificationMsg.warning
              ? FaCircleExclamation
              : FaCircleInfo,
            { className: 'mr-2 h-6 w-6' }
          )}
          <p className="font-semibold">
            {notificationMsg.success
              ? notificationMsg.success
              : notificationMsg.error
              ? notificationMsg.error
              : notificationMsg.warning
              ? notificationMsg.warning
              : notificationMsg.info}
          </p>
        </div>
        <span
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 m-1 text-black bg-gray-300 hover:bg-gray-400  dark:hover:text-white dark:hover:bg-gray-500  rounded-xl duration-300 cursor-pointer"
        >
          <IoMdClose />
        </span>
      </div>
    </div>,
    document.getElementById('popup-modal-root') as HTMLElement
  );
};

export default NotificationPopupModel;
