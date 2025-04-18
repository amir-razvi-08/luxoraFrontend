import { Routes, Route } from "react-router-dom";
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
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import Verify from "./pages/Verify";
import ForgetPassword from "./pages/ForgetPassword";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

function App() {
    const {forgetPassword } = useContext(ShopContext);
    const token = localStorage.getItem("authToken");

    return (
        <div className="relative ">
            <div className="fixed inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(185%_125%_at_50%_10%,#f7f7f7_40%,#a0e8ff_100%)]"></div>
            <ToastContainer />

            {token ? (
                <>
                    <Navbar />
                    <div className="sm:px-[3vw] md:px-[4vw] lg:px-[5vw]">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/collection" element={<Collection />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/place-order" element={<PlaceOrder />} />
                            <Route path="/product/:productId" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/verify" element={<Verify />} />
                        </Routes>
                    </div>
                    <div onClick={scrollToTop} className="my-0 mt-40 text-sm py-4 bg-[#3e546c] cursor-pointer flex items-center justify-center text-white">
                        Back to top
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    {forgetPassword ? (
                        <ForgetPassword />
                    ) : (
                        <Routes>
                            <Route path="/" element={<Login />} />
                        </Routes>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
