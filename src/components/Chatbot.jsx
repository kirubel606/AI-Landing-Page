import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ sendMessageApiUrl, receiveMessagesApiUrl }) => {
  const [messages, setMessages] = useState([
    { id: 0, from: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate polling to get incoming messages (replace with real websocket or server polling)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(receiveMessagesApiUrl);
        if (res.ok) {
          const newMsgs = await res.json(); // Expect [{id, from, text}, ...]
          if (newMsgs.length) {
            setMessages((prev) => {
              // Avoid duplicates
              const existingIds = new Set(prev.map(m => m.id));
              const filtered = newMsgs.filter(m => !existingIds.has(m.id));
              return [...prev, ...filtered];
            });
          }
        }
      } catch (e) {
        console.error("Failed to fetch messages", e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [receiveMessagesApiUrl]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(sendMessageApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });
      if (!res.ok) {
        console.error("Failed to send message");
      }
    } catch (e) {
      console.error("Send message error", e);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-[500px] border rounded shadow-md bg-white">
      <div className="flex-grow p-4 overflow-auto space-y-4">
        {messages.map(({ id, from, text }) => (
          <div
            key={id}
            className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[75%] ${
                from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow resize-none border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
