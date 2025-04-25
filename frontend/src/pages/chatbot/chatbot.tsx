import { useState } from 'react';
import { IoIosSend, IoMdArrowDropdownCircle } from 'react-icons/io';
import { LuBot } from 'react-icons/lu';

export default function Chatbot() {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('Claude 3');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  function handleSend() {
    console.log('Message sent!');
  }

  return (
    <div className="flex flex-col bg-gray-200 dark:bg-dark text-black dark:text-white p-4 rounded-xl shadow-lg w-[400px] border border-neutral-400 dark:border-gray-700 mx-auto m-4 h-[600px] ">
      <div className="relative mb-2">
        <button
          type="button"
          title="Select model"
          aria-label="Select model"
          className="flex items-center justify-between w-full p-3 bg-white dark:bg-slate-800 rounded-xl border border-neutral-300 dark:border-gray-600 cursor-pointer shadow-md hover:border-blue-400 transition-transform duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center gap-2">
            <LuBot size={20} className="text-blue-400" />
            <span className="font-medium">{selectedModel}</span>
          </div>
          <IoMdArrowDropdownCircle
            size={22}
            className={`transition-transform duration-300 hover:scale-105 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`absolute top-full w-full bg-white dark:bg-slate-800 border border-neutral-300 dark:border-gray-600 rounded-xl shadow-xl z-10 overflow-hidden transition-transform duration-500 ${
            !isDropdownOpen ? 'scale-y-0' : 'scale-y-100'
          } origin-top`}
        >
          {['GPT 3.5 Turbo', 'GPT 4', 'GPT 4 (32k)', 'Claude 3', 'Mistral 7B'].map(model => (
            <button
              type="button"
              key={model}
              className="w-full text-left px-3 py-2 border-b border-gray-600 hover:bg-neutral-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              onClick={() => {
                setSelectedModel(model);
                setIsDropdownOpen(false);
              }}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Messages container */}
      <div className="flex flex-col flex-1 gap-2  overflow-y-auto  p-2 rounded-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-slate-800">
        {/* Suggestion box */}
        <div className="flex flex-col gap-2 px-2 py-4 rounded-lg bg-gray-200 dark:bg-dark">
          {[
            'What is this site about?',
            'What modules are available in this site?',
            'Give the contact info about this site!',
          ].map(msg => (
            <button
              type="button"
              key={msg}
              className="px-4 py-2 w-fit max-w-xs border border-gray-600 rounded-full hover:bg-neutral-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={e => setInputMessage((e.target as HTMLButtonElement).innerText)}
            >
              {msg}
            </button>
          ))}
        </div>
      </div>

      {/* Input section  */}
      <div className="flex items-end gap-2 mt-2 border border-neutral-500 dark:border-gray-600 rounded-lg p-2">
        <textarea
          placeholder="Ask a question..."
          value={inputMessage}
          onChange={e => {
            setInputMessage(e.target.value);
          }}
          className="w-full p-2 outline-none text-black dark:text-white placeholder-gray-400 rounded bg-white dark:bg-slate-800 resize-none min-h-[40px] max-h-[120px] overflow-y-auto"
        />
        <button
          type="button"
          title="Send message"
          aria-label="Send message"
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className={`${
            !inputMessage.trim() ? ' bg-white text-black ' : 'bg-blue-500 text-white'
          } px-3 py-1 rounded-full transition-colors duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <IoIosSend size={20} className="w-6 h-6" />
        </button>
      </div>
      <p className="mt-1 text-sm font-extrabold text-center text-gray-500   dark:text-gray-400">
        Karan.email
      </p>
    </div>
  );
}
