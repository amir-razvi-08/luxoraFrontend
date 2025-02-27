import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import axios from "axios";

function navbar() {
    const [visible, setVisible] = useState(false);
    const { getCartCount, serverURL, navigate } = useContext(ShopContext);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await axios.post(
                serverURL + "/users/logout",
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success("Logout successful");
                localStorage.removeItem("authToken");
                localStorage.removeItem("admin");
                navigate("/");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Logout fails");
        }
    };

    return (
        <div className="flex items-center justify-between py-5 font-medium top-0 sticky z-40 bg-white px-4 sm:px-[3vw] md:px-[4vw] lg:px-[5vw] shadow-md">
            <Link to="/">
                <img src={assets.logo} className="w-28" alt="" />
            </Link>
            <ul className="hidden md:flex gap-5 text-sm text-gray-700">
                <NavLink to="/collection" className="flex flex-col items-center gap-1 ">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1 ">
                    <p>ABOUT US</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>
            <div className="w-96">
                <SearchBar />
            </div>

            <div className="flex items-center gap-6">
                <div className="group relative hidden sm:block">
                    <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />

                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <NavLink to="/orders">
                                <p className="cursor-pointer hover:text-black">Orders</p>
                            </NavLink>

                            <p onClick={handleLogout} className="cursor-pointer hover:text-black">
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
                <Link to="/cart" className="relative sm:m-0 ml-2">
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
                    <p
                        className={`absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px] ${
                            getCartCount() == 0 ? "hidden" : ""
                        }`}
                    >
                        {getCartCount()}
                    </p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5  cursor-pointer md:hidden" alt="" />
            </div>

            <div className={`absolute z-60 top-0 right-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"} duration-200`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/collection">
                        COLLECTION
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/about">
                        ABOUT US
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/contact">
                        CONTACT
                    </NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border-b" to="/orders">
                        ORDERS
                    </NavLink>
                    <p onClick={handleLogout} className="py-2 pl-6 border-b">
                        LOGOUT
                    </p>
                </div>
            </div>
        </div>
    );
}

export default navbar;
