import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header: string;
  footer: string;
};

const FlexiPopupModel = ({ isOpen, onClose, children, header, footer }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={` bg-linear-to-t from-neutral-400 via-neutral-50 to-neutral-600 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 shadow-2xl hover:shadow-xl hover:scale-102 dark:shadow-black px-6 py-2 rounded-2xl relative 
        ${!isVisible ? 'scale-95' : 'scale-100'} transition-transform duration-300`}
      onClick={e => e.stopPropagation()}
    >
      <div className="grid grid-cols-[1fr_auto] gap-6">
        {/* header */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-extrabold  text-black dark:text-white">{header}</h2>
        </div>
        <span
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-black bg-gray-100 hover:bg-gray-200  dark:text-gray-300 dark:bg-gray-600 dark:hover:text-white dark:hover:bg-gray-700  rounded-xl duration-300 transition-transform cursor-pointer"
        >
          <IoMdClose />
        </span>
      </div>
      <hr className="my-1 border-gray-500 dark:border-gray-600" />

      {children}
      {/* Footer */}
      <hr className="my-1 border-gray-500 dark:border-gray-600" />
      <div className="w-full flex flex-col items-center">
        <div className=" font-extrabold font-mono text-black dark:text-white">{footer}</div>
      </div>
    </div>
  );
};

export default FlexiPopupModel;
