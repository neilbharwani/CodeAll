import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const checkCooldown = async () => {
    try {
      const response = await axios.get("https://scholar-codeall.onrender.com/cooldown");
      return response.data.cooldown;
    } catch {
      return 0;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const remainingCooldown = await checkCooldown();
    if (remainingCooldown > 0) {
      setCooldown(remainingCooldown);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Please wait ${remainingCooldown} seconds before sending another message.`,
        },
      ]);
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setIsProcessing(true);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Processing your request...",
      },
    ]);

    try {
      const response = await axios.post("https://scholar-codeall.onrender.com/chat", {
        question: input,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.answer || "Sorry, something went wrong!",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong!" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
    setIsProcessing(false);
  };

  return (
    <div className="chatbox">
      <div className="messages">
        <motion.div
          className="message p-4 rounded-lg bg-blue-500 text-white self-start"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span>
            <b>ScholarAI - </b>
          </span>
          Hello! I am ScholarAI made from CodeAll. What are your questions about your studies today?
        </motion.div>

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message p-4 rounded-lg ${
              msg.sender === "user"
                ? "bg-green-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
          >
            {msg.sender === "user" ? <b>Me - </b> : <b>ScholarAI - </b>}
            {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ScholarAI anything..."
          disabled={isProcessing}
        />
        <button onClick={handleSend} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
