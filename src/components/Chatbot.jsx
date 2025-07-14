import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMessageCircle, FiX } from "react-icons/fi";

const sampleQuestions = [
  "ስለ ኢትዮጵያ አርቴፊሻል ኢንተለጀንስ ኢንስቲትዩት",
  "አርቴፊሻል ኢንተለጀንስ (AI) ምንድነው?",
  "ኢትዮጵያ ውስጥ AI እንዴት እየተጠቀሰ ነው?",
  "AI በኢንዱስትሪ ምን ማድረግ ይችላል?",
  "የEAII አላማ ምንድነው?",
  "AI ስለ ወደፊት ምን ትንቢት አላችሁ?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message: "ሰላም! እባክህ ከታች ያሉትን ጥያቄዎች ይምረጡ።",
      options: [],
      id: 0,
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", message: text, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://cms.aii.et/chatbot/webhooks/rest/webhook/",
        userMessage
      );

      const botReplies = response.data;

      if (Array.isArray(botReplies)) {
        setMessages((prev) => [
          ...prev,
          ...botReplies.map((reply) => ({
            sender: "bot",
            message: reply.text,
            options: [],
            id: Date.now() + Math.random(),
          })),
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            message: botReplies.text,
            options: [],
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
          options: [],
          id: Date.now() + Math.random(),
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Button */}
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

      {/* Chat Window */}
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
            className="bg-[#003366] text-white p-4 flex items-center justify-between
            shadow-md"
          >
            <h2 className="text-lg font-semibold tracking-wide select-none">Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform duration-300 text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
              aria-label="Close chat"
              title="Close chat"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-5 bg-gray-50 shadow-inner rounded-b-2xl"
            tabIndex={-1}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start max-w-full
                  ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div
                    className="w-9 h-9 bg-[#003366] text-white rounded-full flex items-center justify-center mr-3
                    select-none animate-bounce"
                    aria-hidden="true"
                    title="Bot"
                  >
                    🤖
                  </div>
                )}

                <div
                  className={`relative px-5 py-3 rounded-2xl max-w-[75%] shadow-md
                    transition-all duration-500 ease-in-out
                    ${
                      msg.sender === "user"
                        ? "bg-[#FF9933] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                    }
                    animate-fade-slide
                    `}
                  style={{ animationFillMode: "forwards" }}
                >
                  {msg.message}
                  {/* Message tail arrow */}
                  <span
                    className={`absolute bottom-0 w-3 h-3 bg-transparent
                    ${
                      msg.sender === "user"
                        ? "right-0 translate-x-1/2 rotate-45 bg-[#FF9933]"
                        : "left-0 -translate-x-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                    }`}
                  ></span>
                </div>

                {msg.sender === "user" && (
                  <div
                    className="w-9 h-9 bg-[#FF9933] text-white rounded-full flex items-center justify-center ml-3
                    select-none animate-bounce"
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

          {/* Questions Selection */}
          <div
            className="p-4 border-t border-gray-300 bg-gray-50 flex flex-wrap gap-3 max-h-36 overflow-y-auto
            scrollbar-thin scrollbar-thumb-[#FF9933] scrollbar-track-gray-200"
          >
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="bg-[#FF9933] hover:bg-[#e68900] text-white px-4 py-2 rounded-full text-sm
                  font-semibold shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#003366]/80"
                aria-label={`Send question: ${q}`}
                title={q}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tailwind keyframes and custom animations injected directly */}
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

        /* Scrollbar styling */
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
