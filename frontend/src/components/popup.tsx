import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header: string;
  footer: string;
};

const PopupModel = ({ isOpen, onClose, children, header, footer }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  if (!isOpen) return null;

  return createPortal(
    // <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-100 backdrop-blur-sm">
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className={`flex flex-col items-center bg-white dark:bg-slate-900 shadow-2xl dark:shadow-black px-6 py-2 m-1 rounded-xl relative 
        ${!isVisible ? 'scale-95' : 'scale-100'} duration-300`}
        onClick={e => e.stopPropagation()}
      >
        <span
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-black bg-gray-300 hover:bg-gray-400  dark:text-gray-300 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-700  rounded-xl duration-300 cursor-pointer"
        >
          <IoMdClose />
        </span>
        {/* header */}
        <div>
          <h2 className="text-2xl font-extrabold font-serif text-black dark:text-white">
            {header}
          </h2>
          <hr className="my-1 border-gray-500 dark:border-gray-500" />
        </div>
        {children}
        {/* Footer */}
        <div>
          <hr className="my-1 border-gray-500 dark:border-gray-500" />
          <div className=" font-extrabold font-mono text-black dark:text-white">{footer}</div>
        </div>
      </div>
    </div>,
    document.getElementById('popup-modal-root') as HTMLElement
  );
};

export default PopupModel;
