import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  svgIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

interface notificationMsgProp {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

type CombinedProps = ModalProps & { notificationMsg: notificationMsgProp };

const NotificationPopupModel = ({ isOpen, onClose, svgIcon, notificationMsg }: CombinedProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const [notificationStatusMsg, setNotificationStatusMsg] = useState<notificationMsgProp>({
/*     success: '',
    info: '',
    warning: '',
    error: '', */
  });

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);

    setNotificationStatusMsg(notificationMsg);
  }, [notificationMsg]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-20 right-0 z-50 ">
      <div
        className={`relative  grid grid-cols-[1fr_20px] gap-4 max-w-[400px]  drop-shadow-xl shadow-red-500  p-2 m-1 rounded-lg transition-transform duration-300 
        ${!isVisible ? 'translate-x-full' : 'translate-x-0'} ${
          notificationStatusMsg.success
            ? 'bg-green-600'
            : notificationStatusMsg.error
            ? 'bg-red-600'
            : notificationStatusMsg.warning
            ? 'bg-yellow-600'
            : notificationStatusMsg.info
            ? 'bg-blue-600'
            : ''
        } `}
      >
        <div className={`flex items-center w-fit mx-auto  text-white px-4 py-2 rounded-lg`}>
          {React.createElement(svgIcon, { className: 'mr-2 h-6 w-6' })}
          <p className="font-semibold">
            {notificationStatusMsg.success
              ? notificationStatusMsg.success
              : notificationStatusMsg.error
              ? notificationStatusMsg.error
              : notificationStatusMsg.warning
              ? notificationStatusMsg.warning
              : notificationStatusMsg.info}
          </p>
        </div>
        <span
          onClick={onClose}
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

//use this like this ========
/*    <NotificationPopupModel
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          svgIcon={FaCircleXmark}
          notificationMsg="Please log in to send a message."
          bgColor="bg-red-600"
        /> */
