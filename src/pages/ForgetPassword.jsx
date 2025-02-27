import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import OtpInput from "../components/OtpInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

function ForgetPassword() {
    const { setForgetPassword, serverURL } = useContext(ShopContext);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(120);
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleOtpValue = (otpValue) => {
        setOtp(otpValue);
    };
    const handleExpireOtp = () => {
        toast.error("OTP expired. Please generate a new OTP.", {
            position: "top-center",
            autoClose: 3000,
        });
    };

    const handleGenerateOtp = async () => {
        try {
            const response = await axios.post(`${serverURL}/users/generate-otp`, { email });
            if (response.data.success) {
                setOtpSent(true);
                setTimer(120);
                setIsOtpExpired(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(`${serverURL}/users/verify-otp`, { otp, email });
            if (response.data.success) {
                setIsOtpVerified(true);
                toast.success("OTP verified successfully!", {
                    position: "top-center",
                    autoClose: 3000,});
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword.trim()) {
            toast.error("Please enter a new password.", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.post(`${serverURL}/users/reset-password`, { email, newPassword });

            if (response.data.success) {
                toast.success("Password updated successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setForgetPassword(false);
                setIsOtpVerified(false);
                setOtpSent(false);
                setNewPassword("");
                setOtp("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
            console.log(error);
        }
    };

    useEffect(() => {
        if (otpSent && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(countdown);
                        setIsOtpExpired(true);
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [otpSent, timer]);

    const formatTimer = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <div className="flex flex-col w-[90%] sm:max-w-96 m-auto bg-white shadow-md mt-20 rounded-lg">
            <div onClick={() => setForgetPassword(false)} className="cursor-pointer m-8 mb-0 gap-1 text-2xl">
                <IoMdArrowRoundBack />
            </div>
            {otpSent ? (
                isOtpVerified ? (
                    <>
                        <div className="w-[90%] p-4 flex flex-col mx-auto my-4 gap-4">
                            <input
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                className="w-full px-3 py-2 border border-gray-500 rounded"
                                placeholder="New Password"
                                required
                            />
                            <input
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className="w-full px-3 py-2 border border-gray-500 rounded"
                                placeholder="confirm password"
                                required
                            />
                        </div>
                        <button onClick={handleResetPassword} className="w-1/2 m-auto rounded bg-black text-white px-8 py-2 mb-8">
                            Reset Password
                        </button>
                    </>
                ) : (
                    <>
                        <div className="w-[90%] p-4 flex flex-col mx-auto mb-4">
                            <p className="text-center">{formatTimer(timer)} remaining</p>
                        </div>
                        <OtpInput onComplete={handleOtpValue} />
                        <div className="m-auto rounded bg-black text-white my-8">
                            <>
                                {isOtpExpired ? (
                                    <button onClick={handleExpireOtp} className="px-12 py-2" disabled={!isOtpExpired}>
                                        Otp Expire
                                    </button>
                                ) : (
                                    <button onClick={handleVerifyOtp} className="px-12 py-2" disabled={isOtpExpired}>
                                        Verify
                                    </button>
                                )}
                            </>
                        </div>
                    </>
                )
            ) : (
                <>
                    <div className="w-[90%] p-4 flex flex-col mx-auto my-4">
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-3 py-2 border border-gray-500 rounded"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <button onClick={handleGenerateOtp} className="w-1/2 m-auto rounded bg-black text-white px-8 py-2 mb-8">
                        Generate OTP
                    </button>
                </>
            )}
        </div>
    );
}

export default ForgetPassword;
