import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const { serverURL, setUserPanel, navigate, setForgetPassword } = useContext(ShopContext);
    const [formData, setFormData] = useState({ fullName: "", username: "", usernameOremail: "", email: "", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const url = `${serverURL}/users/${currentState === "Login" ? "login" : "register"}`;
            const payload = currentState === "Login" ? { usernameOremail: formData.usernameOremail, password: formData.password } : formData;
            const response = await axios.post(url, payload);

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.data.accessToken);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong during login", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex flex-col w-[90%] sm:max-w-96 m-auto bg-white shadow-md mt-20 rounded-lg">
            <form onSubmit={onSubmitHandler} className="flex flex-col items-center p-4 pb-0 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl text-gray-700">{currentState}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>
                <div className="w-full px-3 pt-2 flex flex-col gap-4">
                    {currentState === "Login" ? (
                        <input
                            type="text"
                            name="usernameOremail"
                            onChange={handleChange}
                            value={formData.usernameOremail}
                            className="w-full px-3 py-2 border border-gray-500 rounded"
                            placeholder="Username / Email"
                            required
                        />
                    ) : (
                        <>
                            <input
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                value={formData.fullName}
                                className="w-full px-3 py-2 border rounded border-gray-500"
                                placeholder="Full Name"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                                className="w-full px-3 py-2 border border-gray-500 rounded"
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className="w-full px-3 py-2 border border-gray-500 rounded"
                                placeholder="Email"
                                required
                            />
                        </>
                    )}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="w-full px-3 py-2 border border-gray-500 rounded"
                        placeholder="Password"
                        required
                    />
                    <div className="w-full flex justify-between text-sm mt-[-8px]">
                        {currentState === "Login" ? (
                            <>
                                <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
                                    Create Account
                                </p>
                                <p onClick={() => setForgetPassword(true)} className="cursor-pointer text-blue-600">
                                    Forgot your password?
                                </p>
                            </>
                        ) : (
                            <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
                                Login Here
                            </p>
                        )}
                    </div>
                    <button className="w-full m-auto rounded bg-black text-white px-8 py-2 mt-4">{currentState === "Login" ? "Login" : "Sign Up"}</button>
                </div>
            </form>
            <div
                onClick={() => setUserPanel(false)}
                className=" text-white cursor-pointer p-2 text-center my-4 bg-blue-600 hover:bg-blue-500 duration-300 rounded m-auto w-1/2"
            >
                Admin Login
            </div>
        </div>
    );
};

export default Login;
