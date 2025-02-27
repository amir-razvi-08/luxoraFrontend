import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import PlaceOrderTotal from "../components/PlaceOrderTotal";

const PlaceOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState(true);
    const { orderItems, setCartItems, setItems, amount, delivery_fee, serverURL, navigate } = useContext(ShopContext);
    const token = localStorage.getItem("authToken");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (e) => {
        e.target.name;
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (formData) => {
        for (const [key, value] of Object.entries(formData)) {
            if (!value.trim()) {
                toast.warn(`${key} is required`, {
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }
        }
        try {
            setItems();

            let order = {
                items: orderItems,
                address: formData,
                amount: amount + delivery_fee,
            };

            if (paymentMethod) {
                const response = await axios.post(serverURL + "/orders/place-cod", order, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setCartItems({});
                    navigate("/orders");
                } else {
                    navigate("/cart");
                }
            } else {
                const response = await axios.post(serverURL + "/orders/stripe", order, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                if (response.data.success) {
                    const { session_url } = response.data.data;
                    window.location.replace(session_url);
                } else {
                    toast.error(response.data.message || "Something went wrong during placing order", { position: "top-center", autoClose: 3000 });
                }
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong during placing order", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3 ">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex flex-col sm:flex-row  gap-3">
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <input
                    onChange={onChangeHandler}
                    name="street"
                    type="text"
                    placeholder="Street"
                    required
                    className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                />
                <div className="flex flex-col sm:flex-row  gap-3">
                    <input
                        onChange={onChangeHandler}
                        name="city"
                        type="text"
                        required
                        placeholder="City"
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="state"
                        type="text"
                        required
                        placeholder="State"
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <div className="flex flex-col sm:flex-row  gap-3">
                    <input
                        onChange={onChangeHandler}
                        name="zipcode"
                        type="text"
                        required
                        placeholder="Zipcode"
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="country"
                        type="text"
                        placeholder="Country"
                        required
                        className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <input
                    onChange={onChangeHandler}
                    name="phone"
                    type="number"
                    required
                    placeholder="Phone "
                    className="border  border-gray-500 rounded py-1.5 px-3.5 w-full"
                />
            </div>

            <div className="mt-8">
                <div className="mt8 min-w-80">
                    <PlaceOrderTotal />
                </div>

                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />

                    <div className="flex flex-col lg:flex-row gap-4">
                        <div
                            onClick={() => {
                                setPaymentMethod(false);
                            }}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p className={` min-w-3.5 h-3.5 border rounded-full ${paymentMethod ? "" : "bg-green-400"}`}></p>
                            <img className="h5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div
                            onClick={() => {
                                setPaymentMethod(true);
                            }}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p className={` min-w-3.5 h-3.5 border rounded-full ${paymentMethod ? "bg-green-400" : ""}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4"> CASH ON DELIVARY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button onClick={() => handlePlaceOrder(formData)} className="bg-black text-white px-16 py-3 text-sm">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
