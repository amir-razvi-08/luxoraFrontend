import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import ForgetPassword from "./pages/ForgetPassword";
import bot from "./assets/chatbot.png";
import { FaChevronDown } from "react-icons/fa";
import { ShopContext } from "./context/ShopContext";
import Chat from "./pages/Chat";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

function App() {
    const location = useLocation();
    const { isVisible, setIsVisible } = useContext(ShopContext);

    const hideLayoutRoutes = ["/login", "/forgot-password"];
    const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

    return (
        <div className="relative">
            <div className="fixed inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(185%_125%_at_50%_10%,#f7f7f7_40%,#a0e8ff_100%)]"></div>
            <ToastContainer />

            {!shouldHideLayout && <Navbar />}

            <div className="sm:px-[3vw] md:px-[4vw] lg:px-[5vw]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>

            {!shouldHideLayout && (
                <div className={`fixed bottom-20 right-6 z-50`}>
                    <div
                        className={`w-[20rem] overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-in-out transform${
                            isVisible ? "translate-y-0 opacity-100 h-[38rem]" : "translate-y-[100%] opacity-0 pointer-events-none h-0"
                        }`}
                    >
                        <Chat />
                    </div>

                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className={`absolute -bottom-18 right-2 w-16 h-16 rounded-lg text-3xl text-gray-600 flex justify-center items-center ${
                            !isVisible ? "bg-none" : "bg-cyan-400 "
                        }`}
                    >
                        {isVisible ? <FaChevronDown /> : <img className="w-16" src={bot} alt="chatbot" />}
                    </button>
                </div>
            )}

            {!shouldHideLayout && (
                <>
                    <div onClick={scrollToTop} className="my-0 mt-40 text-sm py-4 bg-[#3e546c] cursor-pointer flex items-center justify-center text-white">
                        Back to top
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
