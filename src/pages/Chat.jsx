import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import typingAnimation from "../assets/typing.json";
import logo from "../assets/blackLogoSym.png";
import { IoSend } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";
import { RiResetLeftLine } from "react-icons/ri";

export default function Chat() {
    const { serverURL } = useContext(ShopContext);
    const [rotate, setRotate] = useState(false);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("luxora_chat_messages");
        return saved ? JSON.parse(saved) : [{ role: "ai", content: "Welcome to Luxora! How can I assist you today? 😊" }];
    });

    const handleProductCheckout = (id) => {
        window.location.href = `https://luxora-fashionshop.vercel.app/product/${id}`;
    };

    useEffect(() => {
        localStorage.setItem("luxora_chat_messages", JSON.stringify(messages));
    }, [messages]);

    function parseAgentResponse(data) {
        const greeting = data.greeting || "Welcome to Luxora!";

        const products = Object.entries(data)
            .filter(([key, value]) => key.startsWith("product") && value && typeof value === "object")
            .map(([key, value]) => ({
                details: value.productDetails,
                id: value.productId,
            }));

        return { greeting, products };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const question = input.trim();
        setInput("");
        setIsTyping(true);

        setMessages((prev) => [...prev, { role: "human", content: [question] }]);

        try {
            const res = await axios.post(`${serverURL}/products/product-query`, {
                question,
            });

            const { greeting, products } = parseAgentResponse(res.data);
            setMessages((prev) => [...prev, { role: "ai", content: greeting, products }]);
            messages.map((val) => console.log(val));
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "ai", content: ["Sorry, I'm unable to answer now."] }]);
        }

        setIsTyping(false);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const resetChat = () => {
        setMessages([{ role: "ai", content: "Welcome to Luxora! How can I assist you today? 😊" }]);
        localStorage.removeItem("luxora_chat_messages");
    };

    return (
        <div className="h-full w-full flex flex-col bg-white">
            <div className="flex h-16 bg-cyan-300 rounded-t-lg items-center justify-between">
                <img className="w-8 h-8 mx-4" src={logo} alt="Luxora Logo" />
                <h1 className="text-gray-600 text-xl font-bold">Chat with Luxora</h1>
                <h2
                    onClick={() => {
                        resetChat();
                        setRotate(true);
                        setTimeout(() => setRotate(false), 500);
                    }}
                    className={`mr-8 cursor-pointer text-2xl text-white bg-black rounded-full p-1 transition-transform duration-500 ${
                        rotate ? "-rotate-360" : ""
                    }`}
                >
                    <RiResetLeftLine />
                </h2>
            </div>

            <div className="h-[28rem] overflow-y-auto space-y-2 mb-3 p-2 flex flex-col hide-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "human" ? "text-right self-end" : "text-left self-start"} text-gray-800 text-sm`}>
                        {msg.role === "ai" && <img className="w-4 h-4 mr-2" src={logo} alt="Bot" />}
                        <div className={`p-2 px-4 max-w-[17rem] rounded-4xl break-words ${msg.role === "human" ? "bg-cyan-200" : "bg-gray-200"}`}>
                            <p className="text-gray-700 text-sm whitespace-pre-line">{msg.content}</p>

                            {msg.products &&
                                msg.products.map((product, idx) => (
                                    <p key={idx} className="text-gray-700 text-sm whitespace-pre-line mt-2">
                                        {product.details}
                                        <br />
                                        <button
                                            onClick={() => handleProductCheckout(product.id)}
                                            className="cursor-pointer bg-yellow-400 flex items-center gap-1 borxder-2 p-1 px-4 rounded-4xl mt-2 tracking-tight"
                                        >
                                            {"Buy Now"}
                                        </button>
                                    </p>
                                ))}
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
