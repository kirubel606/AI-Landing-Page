import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { FiMessageCircle, FiArrowLeft, FiLogOut } from "react-icons/fi";

const menuTree = {
  title: "ዋና ምናሌ",
  options: [
    {
      label: "የምንሰጣቸው አገልግሎቶች",
      children: [
        { label: "ስለ ኢንስቲትዩት" },
        { label: "የAI መተግበሪያዎች" },
        { label: "ምርምር እና ልማት" },
        { label: "ዕድሎች" },
        { label: "ትብብር" },
        { label: "አድራሻ" },
        { label: "አጠቃላይ መረጃ" },
      ],
    },
    {
      label: "ስለ ኢትዮጵያ አርቴፊሻል ኢንተለጀንስ ኢንስቲትዩት",
      children: [
        { label: "አርቴፊሻል ኢንተለጀንስ ምንድነው?" },
        { label: "ራዕያችን" },
        { label: "ተልእኮችን" },
        { label: "እሴቶች" },
        { label: "አቅም" },
      ],
    },
    {
      label: "በተለያዩ ዘርፎች የAI መተግበሪያ",
      children: [
        { label: "በጤና" },
        { label: "በግብርና" },
        { label: "በህግ ማስከባር" },
        { label: "በትምህርት" },
        { label: "በዲጂታል ኢኮኖሚ" },
      ],
    },
    {
      label: "አጠቃላይ መረጃ",
      children: [
        { label: "የምርምር ፕሮጀክቶች" },
        { label: "የገንዘብ ድጋፍ" },
        { label: "ሳይንስ እና ቴክኖሎጂ" },
        { label: "ዲጂታል መንትያ" },
      ],
    },
    {
      label: "ዕድሎች",
      children: [
        { label: "ለወጣቶች" },
        { label: "ለአካል ጉዳተኞች" },
        { label: "ኢንተርንሽፕ" },
        { label: "የስራ እድሎች" },
      ],
    },
  ],
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message: "ሰላም! እባክህ ከታች ያሉትን አማራጮች ይምረጡ።",
      id: 0,
    },
  ]);
  const [menuStack, setMenuStack] = useState([menuTree]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change or chatbot opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const currentMenu = menuStack[menuStack.length - 1];

  // Handle user option selection
  const handleOptionClick = useCallback(
    async (optionLabel, hasChildren) => {
      // Add user's message
      const userMessage = { sender: "user", message: optionLabel, id: Date.now() };
      setMessages((prev) => [...prev, userMessage]);

      if (hasChildren) {
        // Navigate into submenu
        const nextMenu = currentMenu.options.find((opt) => opt.label === optionLabel);

        if (nextMenu && nextMenu.children) {
          setMenuStack((prev) => [...prev, { ...nextMenu, options: nextMenu.children }]);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              message: `እባክህ የ "${optionLabel}" አማራጮችን ይምረጡ።`,
              id: Date.now() + 1,
            },
          ]);
        }
      } else if (optionLabel === "ይዉጡ") {
        // Exit chat
        setIsOpen(false);
        setMessages([
          {
            sender: "bot",
            message: "ሰላም! እባክህ ከታች ያሉትን አማራጮች ይምረጡ።",
            id: Date.now(),
          },
        ]);
        setMenuStack([menuTree]);
      } else if (optionLabel === "<-- ወደ ዋና ምናሌ") {
        // Go back to main menu
        setMenuStack([menuTree]);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            message: "ዋና ምናሌ ወደቀለቀለ። እባክህ አንድ አማራጭ ይምረጡ።",
            id: Date.now(),
          },
        ]);
      } else {
        // Leaf option: call backend
        try {
          const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            
          await sleep(1000);
          const { data: botReplies } = await axios.post(
            "https://cms.aii.et/chatbot/webhooks/rest/webhook/",
            { sender: "user", message: optionLabel }
          );

          if (Array.isArray(botReplies) && botReplies.length > 0) {
            setMessages((prev) => [
              ...prev,
              ...botReplies.map((reply) => ({
                sender: "bot",
                message: reply.text,
                id: Date.now() + Math.random(),
              })),
            ]);
          } else if (botReplies?.text) {
            setMessages((prev) => [
              ...prev,
              {
                sender: "bot",
                message: botReplies.text,
                id: Date.now() + Math.random(),
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                sender: "bot",
                message: "ይቅርታ፣ መልስ አልተገኘም።",
                id: Date.now() + Math.random(),
              },
            ]);
          }
        } catch (error) {
          console.error(error);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              message: "ይቅርታ፣ አንድ ስህተት ተከስቷል።",
              id: Date.now() + Math.random(),
            },
          ]);
        }
      }
    },
    [currentMenu]
  );

  // Go back one menu level
  const handleBack = useCallback(() => {
    setMenuStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        message: "ዋና ምናሌ ወደቀለቀለ። እባክህ አንድ አማራጭ ይምረጡ።",
        id: Date.now(),
      },
    ]);
  }, []);

  // Exit chat and reset
  const handleExit = useCallback(() => {
    setIsOpen(false);
    setMessages([
      {
        sender: "bot",
        message: "ሰላም! እባክዎ ከታች ያሉትን አማራጮች ይምረጡ።",
        id: Date.now(),
      },
    ]);
    setMenuStack([menuTree]);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#003366] hover:bg-[#002244] text-white p-4 rounded-full shadow-xl flex items-center justify-center
            animate-pulse hover:animate-none transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#FF9933]/60"
          aria-label="Open chat"
          title="Chat with us"
        >
          <FiMessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div
          className="w-80 h-[520px] bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden
          animate-chatbot-slide"
          role="dialog"
          aria-modal="true"
          aria-label="Chatbot window"
        >
          {/* Header */}
          <div
            className="bg-[#003366] text-white p-4 flex items-center justify-between shadow-md"
          >
            <h2 className="text-lg font-semibold tracking-wide select-none">Chatbot</h2>
            <div className="flex items-center gap-3">
              {menuStack.length > 1 && (
                <button
                  onClick={handleBack}
                  className="hover:bg-[#002244] p-1 rounded-md transition-colors"
                  aria-label="Back"
                  title="Back"
                >
                  <FiArrowLeft size={20} />
                </button>
              )}
              <button
                onClick={handleExit}
                className="hover:bg-[#002244] p-1 rounded-md transition-colors"
                aria-label="Exit"
                title="Exit"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50 shadow-inner rounded-b-2xl"
            tabIndex={-1}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start max-w-full ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div
                    className="w-9 h-9 bg-[#003366] text-white rounded-full flex items-center justify-center mr-3 select-none animate-bounce"
                    aria-hidden="true"
                    title="Bot"
                  >
                    🤖
                  </div>
                )}

                <div
                  className={`relative px-5 py-3 rounded-2xl max-w-[75%] shadow-md transition-all duration-500 ease-in-out ${
                    msg.sender === "user"
                      ? "bg-[#FF9933] text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                  } animate-fade-slide`}
                  style={{ animationFillMode: "forwards" }}
                >
                  {msg.message}
                  <span
                    className={`absolute bottom-0 w-3 h-3 ${
                      msg.sender === "user"
                        ? "right-0 translate-x-1/2 rotate-45 bg-[#FF9933]"
                        : "left-0 -translate-x-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                    }`}
                  />
                </div>

                {msg.sender === "user" && (
                  <div
                    className="w-9 h-9 bg-[#FF9933] text-white rounded-full flex items-center justify-center ml-3 select-none animate-bounce"
                    aria-hidden="true"
                    title="User"
                  >
                    👤
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Options Panel */}
          <div
            className="p-4 border-t border-gray-300 bg-gray-50 flex flex-col gap-3 max-h-40 overflow-y-auto
            scrollbar-thin scrollbar-thumb-[#FF9933] scrollbar-track-gray-200 rounded-b-2xl"
          >
            {currentMenu.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt.label, !!opt.children)}
                className="bg-[#FF9933] hover:bg-[#e68900] text-white px-4 py-2 rounded-full text-sm
                  font-semibold shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#003366]/80
                  flex justify-between items-center"
                aria-label={`Send question: ${opt.label}`}
                title={opt.label}
                type="button"
              >
                <span>{opt.label}</span>
                {opt.children && (
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transform transition-transform duration-300"
                  >
                    ▶
                  </span>
                )}
              </button>
            ))}

            {/* Back & Exit buttons */}
            {menuStack.length > 1 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold
                  shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#003366]/80"
                aria-label="Back to previous menu"
                type="button"
              >
                ← ወደ ዋና ምናሌ
              </button>
            )}
            <button
              onClick={handleExit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold
                shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#003366]/80"
              aria-label="Exit chat"
              type="button"
            >
              ይዉጡ
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes chatbot-slide {
          0% { transform: translateY(50%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-chatbot-slide {
          animation: chatbot-slide 0.3s ease-out forwards;
        }
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(12px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-slide {
          animation: fade-slide 0.35s ease forwards;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #FF9933 #f0f0f0;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #FF9933;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
