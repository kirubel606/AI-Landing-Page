import React, { useState } from "react";
import { FaComments } from "react-icons/fa";  // or any icon you like
import Chatbot from "./Chatbot";  // adjust path as needed

const ChatbotWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
      >
        <FaComments size={24} />
      </button>

      {/* Chatbot Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[350px] h-[500px] shadow-lg rounded-lg overflow-hidden">
          <Chatbot
            sendMessageApiUrl="/api/send"  // your backend endpoint
            receiveMessagesApiUrl="/api/receive"  // your backend endpoint
          />
        </div>
      )}
    </>
  );
};

export default ChatbotWrapper;
