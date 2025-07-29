interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

export default function Switch({ isOn, handleToggle }: SwitchProps) {
  return (
    <button
      type="button"
      title={isOn ? 'Show Not-Available Products too' : 'Hide Not-Available Products'}
      onClick={handleToggle}
      className={`relative w-14 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
        isOn ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg shadow-gray-900 transition-transform duration-300 ${
          isOn ? 'translate-x-9' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
