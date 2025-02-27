import { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
console

function Verify() {
    const { navigate, setCartItems, serverURL } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const token = localStorage.getItem("authToken");

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try {
            const response = await axios.post(
                serverURL + "/orders/verify-stripe",
                { success, orderId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                setCartItems({});
                navigate("/orders");
            } else {
                navigate("/cart");
            }
        } catch (error) {
            toast.error(error.message || "stripe-verification failed", {
                position: "top-center",
                autoClose: 3000,
            });
            navigate("/cart");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return <></>;
}

export default Verify;
