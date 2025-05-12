import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { useMainPopupStore } from '../../stores/popup/mainPopupStore';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  header: string;
  footer: string;
};

const PopupModel = ({ children, header, footer }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  // const [isPopupOpen, setIsPopupOpen] = useState<boolean>(isOpen);

  //main popup store
  const popupMsg = useMainPopupStore(state => state.mainPopupMsg);
  const { setMainPopupMsg } = useMainPopupStore();

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  return createPortal(
    // <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-100 backdrop-blur-sm">
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[3px] ${
        popupMsg ? 'block' : 'hidden'
      }`}
      onClick={() => setMainPopupMsg('')}
    >
      <div
        className={`max-w-[400px] bg-white dark:bg-slate-900 shadow-2xl hover:shadow-xl dark:shadow-black px-6 py-2 m-1 rounded-2xl relative 
        ${!isVisible ? 'scale-95' : 'scale-100'} duration-300`}
        onClick={e => e.stopPropagation()}
      >
        <button
          title="close popup"
          type="button"
          onClick={() => setMainPopupMsg('')}
          className="absolute top-3 right-3 p-1 text-black bg-gray-300 hover:bg-gray-400  dark:text-gray-300 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-700  rounded-xl duration-300 cursor-pointer"
        >
          <IoMdClose />
        </button>
        {/* header */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-extrabold font-serif text-black dark:text-white">
            {header}
          </h2>
        </div>
        <hr className="my-1 border-gray-500 dark:border-gray-500" />

        {children}
        {/* Footer */}
        <hr className="my-1 border-gray-500 dark:border-gray-500" />
        <div className="w-full flex flex-col items-center">
          <div className=" font-extrabold font-mono text-black dark:text-white">{footer}</div>
        </div>
      </div>
    </div>,
    document.getElementById('popup-modal-root') as HTMLElement
  );
};

export default PopupModel;
