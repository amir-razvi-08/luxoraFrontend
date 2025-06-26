import { useState, useRef } from "react";

const OtpInput = ({ onComplete }) => {
    const length = 6;
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length > 1) return;

        const newOtp = otp.map((digit, i) => (i === index ? value : digit));
        setOtp(newOtp);

        if (value && index < length - 1) inputRefs.current[index + 1].focus();
        if (newOtp.every(Boolean)) onComplete(newOtp.join(""));
    };

    return (
        <div className="flex gap-3 mx-auto">
            {otp.map((digit, index) => (
                <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => e.key === "Backspace" && !digit && index > 0 && inputRefs.current[index - 1].focus()}
                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-100 border-b-4 border-gray-400 focus:border-black outline-none transition-all rounded-lg shadow-md"
                    whileFocus={{ scale: 1.1 }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
