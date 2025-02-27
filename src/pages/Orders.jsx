import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Orders = () => {
    const { products, currency, serverURL, navigate, orderItems, setAmount } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const fetchOrders = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const response = await axios.get(`${serverURL}/orders/user-orders`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setOrders(response.data.data.reverse());
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message, {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        });

        if (!result.isConfirmed) return;

        const token = localStorage.getItem("authToken");
        if (!token) {
            Swal.fire("Error", "Authentication token not found!", "error");
            return;
        }

        try {
            const response = await axios.patch(
                `${serverURL}/orders/cancel/${orderId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                Swal.fire("Canceled!", "Your order has been canceled.", "success");
                fetchOrders();
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Failed to cancel order", "error");
        }
    };

    const handleBuyAgain = async (orderId) => {
        const order = orders.find((order) => order._id === orderId);
        orderItems.length = 0;
        let value = 0;
        order.items.forEach((item) => {
            orderItems.push(item);
            value += item.discountPrice * item.quantity;
        });
        setAmount(value);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        navigate("/place-order");
    };

    return (
        <div className="pt-16">
            <div className="mb-3 text-2xl">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders.</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="mb-6 bg-white shadow-md flex flex-col sm:flex-row justify-between gap-0 sm:gap-16">
                            <div className="flex flex-col w-[24rem]">
                                {order.items.map((item, index) => {
                                    const productData = products.find((product) => product._id === item._id);
                                    if (!productData) return null;
                                    return (
                                        <div
                                            key={`${order._id}-${item._id}-${index}`}
                                            className="p-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
                                        >
                                            <div className="flex items-start gap-">
                                                <img src={productData.image[0].url} alt="" className="w-16 sm:w-20" />
                                                <div>
                                                    <p className="sm:text-base font-medium">{productData.name}</p>
                                                    <div className="flex items-center gap-5 mt-2 text-base text-gray-700">
                                                        <p>
                                                            {currency}
                                                            {productData.discountPrice}
                                                        </p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>Size: {item.size}</p>
                                                    </div>
                                                    <p className="mt-2">
                                                        Date: <span className="text-gray-400">{formatDate(order.createdAt)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center w-48">
                                <div className="flex items-center gap-2 p-4">
                                    <p className={`min-w-2 h-2 rounded-full bg-green-400 ${order.status === "Cancelled" ? "bg-red-500" : ""}`}></p>
                                    <p className="text-sm md:text-base">{order.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center mr-8 p-4">
                                {order.status === "Cancelled" ? (
                                    <button
                                        onClick={() => handleBuyAgain(order._id)}
                                        className="border cursor-pointer bg-[#bff4fb] px-4 py-2 text-sm font-medium rounded-sm text-gray-700 h-10 w-32"
                                    >
                                        Buy Again
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        className="border cursor-pointer bg-[#bff4fb] px-4 py-2 text-sm font-medium rounded-sm text-gray-700 h-10 w-32"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
