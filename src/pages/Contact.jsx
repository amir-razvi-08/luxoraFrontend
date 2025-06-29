import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import {motion} from 'framer-motion'

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const { serverURL } = useContext(ShopContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("authToken");

        try {
            const res = await axios.post(serverURL + "/email/contact", formData, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success("Message sent successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            toast.error(error.message+"Failed to send message", {
                position: "top-center",
                autoClose: 3000,
            });
        }

        setLoading(false);
    };

    return (
        <div>
            <div className="to-current text-2xl pt-10">
                <Title text1={"CONTACT"} text2={"US"} />
            </div>

            <div className="flex flex-col justify-center sm:flex-row gap-10 my-10 mb-28">
                <img
                    src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698934/insdvvf74kfn927r05ck.jpg"
                    alt=""
                    className="w-full sm:max-w-[480px]"
                />

                <div>
                    <div className="flex flex-col justify-center items-start gap-4 mb-8 p-4">
                        <p className="font-semibold text-altext-gray-600">Our Store</p>
                        <p className="text-gray-500">
                            7298 King Lodge
                            <br />
                            North Elton, Illinois 78154
                        </p>

                        <p className="text-gray-800">
                            Tel: <span className="text-gray-500">+1 800 123 1234</span>
                        </p>
                        <p className=" text-gray-800">
                            Email: <span className="text-gray-500">admin@luxora.com</span>
                        </p>

                        <p className="text-gray-500">Careers at Luxora</p>
                        <p className="text-gray-500">Learn more about our teams and job openings.</p>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4 p-4">
                        <p className="font-semibold text-altext-gray-600">Visit Us</p>
                        <p className="text-gray-500">
                            Luxora Headquarters
                            <br />
                            123 Fashion Avenue, Suite 456
                            <br />
                            Lucknow, utterPradesh,
                            <br />
                            India
                        </p>
                        <p className="text-gray-800">
                            Tel: <span className="text-gray-500">+1 800 453 1634</span>
                        </p>
                        <p className=" text-gray-800">
                            Email: <span className="text-gray-500">support@luxora.com</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
                <div className="to-current text-2xl pt-10">
                    <Title text1={"GET IN"} text2={"TOUCH"} />
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full p-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="w-full p-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black mt-4 md:mt-0"
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                        className="w-full p-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black mt-4 md:mt-0"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        required
                        className="w-full p-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    ></textarea>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        className="bg-black text-white py-3 px-8 rounded-xl shadow-md hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
