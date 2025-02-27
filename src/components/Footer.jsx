import { useContext } from "react";
import img from "../assets/whiteLogoSym.png";
import { ShopContext } from "../context/ShopContext";

const Footer = () => {
    const { navigate } = useContext(ShopContext);

    const handleClick = (value) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        if (value) navigate(value);
    };

    return (
        <div className="bg-[#2f3f51] text-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 pt-10 ">
                <div className="">
                    <div className="mb-4 cursor-pointer" onClick={() => handleClick("/")}>
                        <img src={img} alt="" className="w-10" />
                        <p className="ml-1">LUXORA</p>
                    </div>

                    <p className="w-full sm:w-2/3 text-gray-300 ">Shop with Luxora and experience the convenience of online shopping like never before.</p>
                </div>

                <div className="">
                    <p className="text-xl font-medium mb-5">COMPANY</p>

                    <ul className="flex flex-col flex-1 text-gray-300 cursor-pointer">
                        <li
                            onClick={() => {
                                handleClick("/");
                            }}
                            className="mb-2"
                        >
                            Home
                        </li>
                        <li
                            onClick={() => {
                                handleClick("/about");
                            }}
                            className="mb-2"
                        >
                            About Us
                        </li>
                        <li
                            onClick={() => {
                                handleClick("/contact");
                            }}
                            className="mb-2"
                        >
                            Contact
                        </li>
                        <li
                            onClick={() => {
                                handleClick("/about");
                            }}
                            className="mb-2"
                        >
                            Privacy policy
                        </li>
                    </ul>
                </div>

                <div className="">
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col flex-1 text-gray-300">
                        <li className="mb-2">1800 456 789 034</li>
                        <li className="mb-2">support@luxora.com </li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className="text-gray-600" />
                <p className="py-5 text-sm text-center">Copyright 2025 @ Luxora.com - All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
