import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { IoIosSend, IoMdArrowDropdownCircle } from 'react-icons/io';
import { LuBot } from 'react-icons/lu';
import { FaRobot } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Chatbot() {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('meta/llama-3.1-70b-instruct');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isGettingChatbotRes, setIsGettingChatbotRes] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);

  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotContainerRef = useRef<HTMLDivElement>(null);
  const suggestionBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!dropdownButtonRef.current?.contains(target) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      if (!chatbotContainerRef.current?.contains(target) && showChatbot) {
        setShowChatbot(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen, showChatbot]);

  async function handleSend(userMsg: string) {
    if (!userMsg.trim()) return;
    setIsGettingChatbotRes(true);
    if (suggestionBoxRef.current) {
      suggestionBoxRef.current.style.display = 'none';
    }
    try {
      setInputMessage('');
      // Adding user message
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }]);
      const response = await axios.post(`${BACKEND_URL}/api/chatbot/send-msg-to-chatbot`, {
        userMsg,
      });
      // Adding bot message
      setMessages(prevMessages => [...prevMessages, { role: 'bot', content: response.data }]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending message:', error.response?.data ?? error.message);
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'bot', content: error.response?.data?.error },
        ]);
      }
    } finally {
      setIsGettingChatbotRes(false);
    }
  }

  return (
    <div className="fixed bottom-0 right-0 w-full z-10 " ref={chatbotContainerRef}>
      <img
        src="/favicons/K.svg"
        alt="chatbot logo"
        className=" fixed  z-50 bottom-0 -right-2 w-12 m-4 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        onClick={() => setShowChatbot(!showChatbot)}
      />

      <div
        className={`absolute flex flex-col bottom-7 right-2 w-[95%] h-150 sm:w-[400px]  bg-gray-200 dark:bg-slate-900 text-black dark:text-white p-4 rounded-xl shadow-lg border border-neutral-400 dark:border-gray-700  ${
          showChatbot ? 'scale-y-100' : 'scale-y-0'
        } origin-bottom transition-transform duration-300 ease-in-out`}
      >
        <div className="relative mb-2">
          <button
            type="button"
            title="Select model"
            aria-label="Select model"
            ref={dropdownButtonRef}
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
            className={`absolute top-full w-full bg-white dark:bg-slate-800 border border-neutral-300 dark:border-gray-600 rounded-xl shadow-xl z-10 overflow-hidden transition-transform duration-300 ${
              !isDropdownOpen ? 'scale-y-0' : 'scale-y-100'
            } origin-top`}
          >
            {['meta/llama-3.1-70b-instruct', 'GPT 4', 'GPT 4 (32k)', 'Claude 3', 'Mistral 7B'].map(
              model => (
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
              )
            )}
          </div>
        </div>

        {/* Messages container */}
        <div className="flex flex-col flex-1 gap-2 overflow-y-auto  p-2 rounded-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-slate-800 ">
          {/* Suggestion box */}
          <div
            className="flex flex-col gap-2 px-2 py-4 rounded-lg bg-gray-200 dark:bg-dark"
            ref={suggestionBoxRef}
          >
            {[
              'What is this website about?',
              'Tell me about Karan?',
              'Where can I get karan`s resume?',
            ].map(msg => (
              <button
                type="button"
                key={msg}
                className="px-4 py-2 w-fit max-w-xs border border-neutral-400 dark:border-gray-600 rounded-full hover:bg-neutral-50 dark:hover:bg-gray-700 transition-hover duration-300  cursor-pointer"
                onClick={e => {
                  setInputMessage((e.target as HTMLButtonElement).innerText);
                }}
              >
                {msg}
              </button>
            ))}
          </div>

          {/* messages box */}
          <div className="">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 mb-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none shadow-lg '
                      : 'bg-gray-300 dark:bg-slate-700 text-black dark:text-white rounded-tl-none'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === 'bot' && (
                      <FaRobot
                        size={18}
                        className="text-black dark:text-white mt-1 shrink-0 self-start"
                      />
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.role === 'user' && (
                      <FaUser size={18} className="text-white mt-1 shrink-0 self-start" />
                    )}
                  </div>
                </div>
              </div>
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
            onKeyDown={e => {
              if (inputMessage.trim() && !isGettingChatbotRes && window.innerWidth > 640) {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputMessage);
                }
              }
            }}
            className="w-full p-2 outline-none text-black dark:text-white placeholder-gray-400 rounded bg-white dark:bg-slate-800 resize-none min-h-[40px] max-h-[120px] overflow-y-auto"
          />
          <button
            type="button"
            title="Send message"
            aria-label="Send message"
            onClick={() => handleSend(inputMessage)}
            disabled={!inputMessage.trim() || isGettingChatbotRes}
            className={` px-3 py-1 rounded-full transition-colors duration-200 ease-in-out cursor-pointer bg-blue-500 text-white disabled:bg-white disabled:text-black  disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <IoIosSend size={20} className="w-6 h-6" />
          </button>
        </div>
        <p className="mt-1 text-sm font-extrabold text-center text-gray-500   dark:text-gray-400">
          Karan.email
        </p>
      </div>
    </div>
  );
}
