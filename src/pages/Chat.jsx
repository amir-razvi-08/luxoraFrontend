import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import typingAnimation from "../assets/typing.json";
import logo from "../assets/blackLogoSym.png";
import { IoSend } from "react-icons/io5";

export default function Chat() {
    const val = [
        { role: "ai", content: "hello" },
        { role: "human", content: "hi there" },
        {
            role: "ai",
            content:
                "how can i help youjhhhhhhhhhhhhh kh hhhhhhhhhhhhhkh jhjg  jhjhuh khk khkh khuguih khkhkhuy ftrdjh ihufyy cuytuyrcviu kh khkjhjgjgjyfy",
        },
    ];
    const [messages, setMessages] = useState([...val]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("authToken");
    const messagesEndRef = useRef(null);

    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const question = input;

        const userMessage = { role: "human", content: question };
        setMessages((prev) => [...prev, userMessage]);

        setInput("");
        setIsTyping(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/chats/message",
                {
                    question: question,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            const aiMessage = { role: "ai", content: res.data.response || "No response." };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "ai", content: "Sorry i'm unable to answer now" }]);
        }
        setIsTyping(false);
    };




     

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/chats/all-messages", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const flattenedMessages = res.data.chats.flatMap((chat) => chat.messages).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                setMessages(flattenedMessages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();
    }, [token]);

    return (
        <div className="h-[37rem] rounded-lg shadow-lg bg-white">
            <div className="flex h-16 bg-cyan-300 rounded-t-lg items-center">
                <img className="w-8 h-8 mx-4" src={logo} alt="" />
                <h1 className="text-gray-600 text-xl font-bold ">Chat with Luxora</h1>
            </div>

            <div className="h-[28rem] overflow-y-auto space-y-2 mb-3 p-2 flex flex-col hide-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "human" ? "text-right self-end" : " text-left self-start "} text-gray-800 text-sm`}>
                        {msg.role === "ai" && <img className="w-4 h-4 mr-2" src={logo}></img>}
                        <div className={`p-2 px-4 max-w-xs rounded-4xl break-words ${msg.role === "human" ? "bg-cyan-200" : "bg-gray-200"}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="w-20 h-12 self-start">
                        <Lottie loop play animationData={typingAnimation} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex border-3 border-cyan-500 mx-4 rounded-4xl">
                <input
                    className="flex-1 p-2 text-black focus:outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                />
                <button type="submit" className="px-4 rounded-r text-cyan-500 text-2xl cursor-pointer">
                    <IoSend />
                </button>
            </form>
        </div>
    );
}
