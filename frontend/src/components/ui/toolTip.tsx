/* interface ToolTipProps {
  onChecked: (checked: boolean) => void;
}

export default function toolTip(onChecked: (checked: boolean) => void): ToolTipProps {
  return (
    <label className="flex items-center mt-2 mb-4 text-sm font-bold text-black dark:text-neutral-300 relative">
      <input
        type="checkbox"
        id="agree-checkbox"
        className="mr-2"
        onChange={onChecked}
      />
      I have read and agree to the data collection policy
      <div className=" ml-1 cursor-pointer relative">
        <button
          type="button"
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowTooltip(!showTooltip)}
          onMouseEnter={() => setShowTooltip(true)}
        >
          ℹ️
        </button>

        <div
          role="tooltip"
          className={`absolute right-0 top-full mt-1 w-64 p-2 text-xs text-white bg-gray-700 rounded shadow-lg transition-opacity duration-200 z-10 ${
            showTooltip ? 'block' : 'hidden'
          }`}
          onMouseLeave={() => setShowTooltip(false)}
        >
          We collect limited device and location information (e.g., browser, platform, IP, and
          region) to enhance security and user experience. This data is not shared with any third
          parties.
        </div>
      </div>
    </label>
  );
}
 */