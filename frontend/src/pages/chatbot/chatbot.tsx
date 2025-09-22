import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import { IoIosSend, IoMdArrowDropdownCircle } from 'react-icons/io';
import { LuBot } from 'react-icons/lu';
import { FaRobot } from 'react-icons/fa6';
import { CiSquarePlus } from 'react-icons/ci';
import { FaUser, FaRegCheckCircle } from 'react-icons/fa';
import { useAuthCheck } from '../../hooks/authCheckHook';
import { useProfileStore } from '../../stores/profile/profileStore';
import CBLoginMsg from './CBLoginMsg';
import { useChatbotStore } from '../../stores/chatbot/chatbotStore';
import axios from 'axios';
import CbShowMore from './cbShowMore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Chatbot() {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedLLM, setSelectedLLM] = useState<string>('meta/llama-3.1-70b-instruct');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isGettingChatbotRes, setIsGettingChatbotRes] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  const [expressRateLimiterHeaderData, setExpressRateLimiterHeaderData] = useState<{
    'ratelimit-remaining': number;
    'ratelimit-reset': number;
  }>({ 'ratelimit-remaining': 50, 'ratelimit-reset': 0 });

  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const showMoreRef = useRef<HTMLDivElement | null>(null);
  const recentChatsRef = useRef<HTMLDivElement | null>(null);

  //profile store data
  const firstName = useProfileStore(state => state.firstName);
  const lastName = useProfileStore(state => state.lastName);
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;

  //authentication check
  const isAuthenticated = useAuthCheck();
  const msgWithoutAuth = useChatbotStore(state => state.msgWithoutAuth);
  const { setMsgWithoutAuth } = useChatbotStore();
  const MAX_MESSAGES_WITHOUT_AUTH = 3;

  useEffect(() => {
    if (isAuthenticated) {
      getChatbotMsgFromdb();
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!dropdownButtonRef.current?.contains(target) && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      if (!chatbotContainerRef.current?.contains(target) && showChatbot) {
        setShowChatbot(false);
      }
      if (
        !showMoreRef.current?.contains(target) &&
        !recentChatsRef.current?.contains(target) &&
        showMore
      ) {
        setShowMore(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isAuthenticated, isDropdownOpen, showChatbot, showMore]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function getChatbotMsgFromdb() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/chatbot/get-msgs-from-db`, {
        withCredentials: true,
      });
      const data = response.data;
      setMessages(data.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching chatbot messages:', error.response?.data);
      } else {
        console.error('Error fetching chatbot messages:', error);
      }
    }
  }

  const controllerRef = useRef<AbortController | null>(null);

  async function handleSend(userMsg: string) {
    if (!userMsg.trim()) return;

    setIsGettingChatbotRes(true);

    // adding user msg
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputMessage('');

    //storing chatbot data in sessionstorage if user is not authenticated
    if (!isAuthenticated) {
      setMsgWithoutAuth();
    } else {
      sessionStorage.removeItem('chatbot');
    }

    // stoping sending messages if user is not authenticated
    if (!isAuthenticated && msgWithoutAuth >= MAX_MESSAGES_WITHOUT_AUTH) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/chatbot/send-msg-to-chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userName: fullName,
          userMsg,
          llmName: selectedLLM,
          historyMsgs: messages,
        }),
        signal: controllerRef.current?.signal,
      });

      setExpressRateLimiterHeaderData({
        'ratelimit-remaining': Number(response.headers.get('ratelimit-remaining')),
        'ratelimit-reset': Number(response.headers.get('ratelimit-reset')),
      });

      // adding bot msg to be replaced
      // setIsGettingChatbotRes(false);
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let responseInChunk = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;

          const data = line.replace(/^data:\s*/, '');
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            responseInChunk += parsed;
            const htmlText = await marked.parse(responseInChunk);

            setMessages(prev => {
              const updatedMsgsArray = [...prev];
              updatedMsgsArray[updatedMsgsArray.length - 1] = {
                ...updatedMsgsArray[updatedMsgsArray.length - 1],
                content: htmlText,
              };
              return updatedMsgsArray;
            });
          } catch (err) {
            console.error('Error parsing streamed chunk', err, data);
          }
        }
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Error streaming message: ' +
            (error instanceof Error ? error.message : 'Unknown error'),
        },
      ]);
    } finally {
      setIsGettingChatbotRes(false);
    }
  }

  return (
    <div className="fixed bottom-0 right-0 w-full z-10 " ref={chatbotContainerRef}>
      <img
        src="/favicons/K.svg"
        alt="chatbot"
        className={`fixed  z-50 bottom-0 -right-2 w-12 m-4 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
          showChatbot ? 'animate-spin ' : ''
        }`}
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
              <span className="font-medium">{selectedLLM}</span>
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
            {[
              'meta/llama-3.1-70b-instruct',
              'qwen/qwen2.5-7b-instruct',
              'nvidia/llama-3.3-nemotron-super-49b-v1',
              'mistralai/mistral-small-24b-instruct',
              'google/gemma-3-1b-it',
              'microsoft/phi-3.5-mini-instruct',
              'tiiuae/falcon3-7b-instruct',
            ].map(model => (
              <button
                type="button"
                key={model}
                className="w-full text-left px-3 py-2 border-b border-gray-600 hover:bg-neutral-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedLLM(model);
                  setIsDropdownOpen(false);
                }}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Messages container */}
        <div className="relative flex flex-col flex-1 rounded-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-slate-800">
          <div className=" h-95 overflow-y-auto p-2">
            {/* Suggestion box */}
            {messages.length === 0 && (
              <div className="flex flex-col gap-2 px-2 py-4 rounded-lg bg-gray-200 dark:bg-dark">
                {[
                  'What is this website about?',
                  'Tell me about Karan?',
                  'How can I contact karan?',
                ].map(msg => (
                  <button
                    type="button"
                    key={msg}
                    className="px-4 py-2 w-fit max-w-xs border border-neutral-400 dark:border-gray-600 rounded-full hover:bg-neutral-50 dark:hover:bg-gray-700 transition-hover duration-300  cursor-pointer"
                    onClick={() => setInputMessage(msg)}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            )}

            {!isAuthenticated && msgWithoutAuth > MAX_MESSAGES_WITHOUT_AUTH && <CBLoginMsg />}

            {/* messages box */}
            <div>
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
                      {msg.role === 'assistant' && (
                        <FaRobot
                          size={18}
                          className="text-black dark:text-white mt-1 shrink-0 self-start"
                        />
                      )}
                      {msg.role === 'assistant' ? (
                        <div
                          className="break-words overflow-auto prose prose-code:inline-block prose-code:w-[50px] prose-a:text-blue-500 dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      ) : (
                        <div className="break-words overflow-auto max-w-none">{msg.content}</div>
                      )}
                      {msg.role === 'user' && (
                        <FaUser size={18} className="text-white mt-1 shrink-0 self-start" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Scroll to the bottom */}
              <div ref={messagesEndRef} />
              {/* Loading indicator */}
              {isGettingChatbotRes && (
                <div className="flex  items-center gap-2 w-fit mb-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 justify-start">
                  <FaRobot className="animate-zoom-in-out" />
                </div>
              )}
            </div>
          </div>

          {/* recent chats */}
          <div
            className={`absolute w-35 h-96  bottom-0 text-black dark:text-white bg-gray-200 dark:bg-slate-800 rounded-lg p-2 z-10 border border-gray-600 ${
              showMore ? 'scale-x-full' : 'scale-x-0'
            } origin-left duration-300 transition-transform`}
            ref={recentChatsRef}
          >
            <h4 className="font-extrabold font-serif border-b border-gray-600 ">Recent Chats</h4>
            <div className="h-88 py-1 overflow-auto space-y-1 ">
              {['No Chat History'].map((msg, i) => (
                <h5
                  key={i}
                  className="px-1 w-full hover:bg-neutral-300 dark:hover:bg-gray-900  rounded cursor-pointer"
                >
                  {msg}
                </h5>
              ))}
            </div>
          </div>
        </div>

        {/* Input section  */}
        <div className="flex items-end gap-2 mt-2 border border-neutral-500 dark:border-gray-600 rounded-lg p-2">
          <textarea
            placeholder="Ask a question..."
            value={inputMessage}
            maxLength={500}
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
          <div className="flex flex-col items-center gap-1">
            <div className="relative" ref={showMoreRef}>
              <button
                type="button"
                aria-label="Send message"
                onClick={() => setShowMore(!showMore)}
                disabled={
                  isGettingChatbotRes ||
                  (!isAuthenticated && msgWithoutAuth >= MAX_MESSAGES_WITHOUT_AUTH + 1)
                }
                className={` rounded cursor-pointer  disabled:bg-white disabled:text-black  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <CiSquarePlus
                  size={25}
                  className={` rounded bg-neutral-300 dark:bg-gray-800 hover:text-black dark:hover:text-white duration-300 transition-transform ${
                    showMore
                      ? 'rotate-45 text-black dark:text-white'
                      : 'text-neutral-600 dark:text-gray-400'
                  }`}
                />
              </button>
              <div
                className={`absolute bottom-12 -right-5 ${
                  showMore ? 'scale-x-100' : 'scale-x-0'
                } duration-300 transition-transform`}
              >
                <CbShowMore setMessages={setMessages} setShowMore={setShowMore} />
              </div>
            </div>
            <button
              type="button"
              title="Send message"
              aria-label="Send message"
              onClick={() => handleSend(inputMessage)}
              disabled={
                (!inputMessage.trim() && isGettingChatbotRes) ||
                (!isAuthenticated && msgWithoutAuth >= MAX_MESSAGES_WITHOUT_AUTH + 1)
              }
              className={` px-3 py-1 rounded-full transition-colors duration-200 ease-in-out cursor-pointer bg-blue-500 text-white disabled:bg-white disabled:text-black  disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <IoIosSend size={20} className="w-6 h-6" />
            </button>
          </div>
        </div>
        <p className="mt-1 text-sm font-extrabold text-center text-gray-500 dark:text-gray-400">
          Karan.email
        </p>
        <div className=" flex items-center justify-center -mb-3  space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <FaRegCheckCircle className="text-green-500" />
          <span>Requests remaining:</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md font-mono font-bold">
            {expressRateLimiterHeaderData['ratelimit-remaining']}
          </span>
        </div>
      </div>
    </div>
  );
}
