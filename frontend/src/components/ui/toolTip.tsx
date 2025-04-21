import { useState, ReactNode } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface ToolTipProps {
  children: ReactNode;
  tooltipStyling?: string;
  tooltipIconStyling?: string;
}

export default function ToolTip({
  children,
  tooltipStyling = '',
  tooltipIconStyling = '',
}: Readonly<ToolTipProps>) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  /* const positionStyles = {
  //   className={`absolute right-0 top-full mt-1 w-64 p-2 text-xs text-white bg-gray-700 rounded shadow-lg  duration-200 z-10 before:content-[''] before:absolute before:-top-1.5 before:right-0  before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-gray-700
    top: 'right-0 top-full mt-1 before:-top-1.5 before:right-0 before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-gray-700',
    bottom:
      'right-0 bottom-full mb-1 before:-bottom-1.5 before:right-0 before:border-l-8 before:border-r-8 before:border-t-8 before:border-l-transparent before:border-r-transparent before:border-t-gray-700',
    left: 'right-full top-0 mr-1 before:top-1 before:-right-1.5 before:border-t-8 before:border-b-8 before:border-l-8 before:border-t-transparent before:border-b-transparent before:border-l-gray-700',
    right:
      'left-full top-0 ml-1 before:top-1 before:-left-1.5 before:border-t-8 before:border-b-8 before:border-r-8 before:border-t-transparent before:border-b-transparent before:border-r-gray-700',
  }; */

  return (
    <div className="w-fit cursor-pointer relative">
      <button
        title="Tooltip"
        aria-label="Tooltip"
        type="button"
        className="ml-1 cursor-pointer relative"
        onClick={() => {
          if (window.innerWidth < 640) {
            setShowTooltip(!showTooltip);
          }
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* <FaInfoCircle className=" text-md text-black dark:text-white my-auto" /> */}
        <FaInfoCircle className={tooltipIconStyling} />
        <div
          className={`absolute text-xs text-white bg-gray-700 rounded shadow-lg  duration-200 z-10 ${tooltipStyling}  ${
            showTooltip ? 'block' : 'hidden'
          }`}
        >
          {children}
        </div>
      </button>
    </div>
  );
}
