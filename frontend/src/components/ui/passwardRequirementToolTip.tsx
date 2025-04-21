import { FaRegCheckCircle } from 'react-icons/fa';
import ToolTip from './toolTip';

export default function PasswardRequirementToolTip() {
  return (
    <ToolTip
      tooltipIconStyling="w-5 mt-2 text-md text-black dark:text-white"
      tooltipBoxStyling="left-0 bottom-full mt-1 w-64 p-2 before:content-[''] before:absolute before:-bottom-1.5 before:left-0.5 before:border-l-8 before:border-r-8 before:border-t-8 before:border-l-transparent before:border-r-transparent before:border-t-gray-700"
    >
      {' '}
      <div className=" p-3 rounded-lg shadow-md bg-gray-100 dark:bg-slate-800 border border-gray-200 max-w-md mx-auto">
        <h3 className="font-extrabold text-lg text-gray-800 dark:text-neutral-100 mb-3 pb-2 border-b border-gray-500 dark:border-neutral-400">
          Password Requirements:
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-neutral-300">
          {[
            'Must be at least 8 characters',
            'Must contain at least one uppercase letter',
            'Must contain at least one lowercase letter',
            'Must contain at least one number',
            'Must contain at least one special character(!@#$%^&*)',
          ].map(requirement => (
            <li key={requirement} className="flex items-start ">
              <FaRegCheckCircle className=" text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-left font-semibold">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>
    </ToolTip>
  );
}
