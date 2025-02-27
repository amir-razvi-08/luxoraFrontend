import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const AdminLogin = () => {
    const { serverURL, navigate, setUserPanel } = useContext(ShopContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(serverURL + "/admin/login", { email, password });

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.data.accessToken);
                localStorage.setItem("admin", response.data.data.admin.role);
                navigate("/");
            }
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="flex flex-col w-[90%] sm:max-w-96 m-auto bg-white shadow-md mt-20 rounded-lg">
                <form onSubmit={handleAdminLogin} className="flex rounded-lg flex-col items-center p-4 pb-0 gap-4 text-gray-800">
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className="prata-regular text-3xl text-gray-700">Admin Panel</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
                    </div>
                    <div className="w-full px-3 pt-2 flex flex-col gap-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-Full px-3 py-2 border rounded border-gray-500"
                            type="email"
                            placeholder="Email"
                            required
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-Full px-3 py-2 border rounded border-gray-500"
                            type="password"
                            placeholder="password"
                            required
                        />
                        <button className="mt-2 mx-auto w-full py-2 px-4 rounded-md text-white bg-black shadow-md" type="submit">
                            Login
                        </button>
                    </div>
                </form>

                <div
                    onClick={() => setUserPanel(true)}
                    className=" text-white cursor-pointer p-2 text-center my-4 bg-blue-600 hover:bg-blue-500 duration-300 rounded m-auto w-1/2"
                >
                    User Login
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
