/* import { useState } from 'react';
import { CiCircleInfo } from 'react-icons/ci';

interface ToolTipProps {
  onChecked: (checked: boolean) => void;
}

export default function ToolTip() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div className="w-fit cursor-pointer relative">
      <button
        title="Tooltip"
        aria-label="Tooltip"
        type="button"
        className="text-white cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
      >
        <CiCircleInfo className="w-5 h-5 mt-1" />
      </button>

      <div
        role="tooltip"
        className={`absolute right-0 top-full mt-1 w-64 p-2 text-xs text-white bg-gray-700 rounded shadow-lg transition-opacity duration-200 z-10 before:content-[''] before:absolute before:-top-1.5 before:right-0.5  before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-gray-700 ${
          showTooltip ? 'block' : 'hidden'
        } `}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <ul className="list-disc list-inside font-semibold text-gray-200">
          <li>
            {' '}
            thsi is testthsi is testthsi is testthsi is testthsi is testthsi is testthsi is test
          </li>
          <li>
            {' '}
            thsi is testthsi is testthsi is testthsi is testthsi is testthsi is testthsi is test
          </li>
          <li>
            {' '}
            thsi is testthsi is testthsi is testthsi is testthsi is testthsi is testthsi is test
          </li>
        </ul>
      </div>
    </div>
  );
}
 */