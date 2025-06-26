import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import typingAnimation from "../assets/typing.json";
import logo from "../assets/blackLogoSym.png";
import { IoSend } from "react-icons/io5";

export default function Chat() {
 const val = [
  { role: "ai", content: ["Welcome to Luxora! How can I assist you today? 😊"] },
];


  const [messages, setMessages] = useState([...val]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();
    setInput("");
    setIsTyping(true);

    
    setMessages((prev) => [...prev, { role: "human", content: [question] }]);

    try {
      const res = await axios.post("https://luxorabackend.onrender.com/api/v1/products/product-query", {
        question,
      });

      const formattedBlocks = res.data
        ? res.data.split("##").map((block) => block.trim())
        : ["No response."];

      setMessages((prev) => [...prev, { role: "ai", content: formattedBlocks }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: ["Sorry, I'm unable to answer now."] },
      ]);
    }

    setIsTyping(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex h-16 bg-cyan-300 rounded-t-lg items-center">
        <img className="w-8 h-8 mx-4" src={logo} alt="Luxora Logo" />
        <h1 className="text-gray-600 text-xl font-bold">Chat with Luxora</h1>
      </div>

      {/* Chat messages */}
      <div className="h-[28rem] overflow-y-auto space-y-2 mb-3 p-2 flex flex-col hide-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "human" ? "text-right self-end" : "text-left self-start"
            } text-gray-800 text-sm`}
          >
            {msg.role === "ai" && (
              <img className="w-4 h-4 mr-2" src={logo} alt="Bot" />
            )}
            <div
              className={`p-2 px-4 max-w-[17rem] rounded-4xl break-words ${
                msg.role === "human" ? "bg-cyan-200" : "bg-gray-200"
              }`}
            >
              {Array.isArray(msg.content) ? (
                msg.content.map((text, idx) => (
                  <p key={idx} className="text-gray-700 text-sm whitespace-pre-line mb-2">
                    {text}
                  </p>
                ))
              ) : (
                <p className="text-gray-700 text-sm whitespace-pre-line">
                  {msg.content}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Typing animation */}
        {isTyping && (
          <div className="w-20 h-12 self-start">
            <Lottie loop play animationData={typingAnimation} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="flex border-3 border-cyan-500 mx-4 rounded-4xl"
      >
        <input
          className="flex-1 p-2 text-black focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          type="submit"
          className="px-4 rounded-r text-cyan-500 text-2xl cursor-pointer"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
