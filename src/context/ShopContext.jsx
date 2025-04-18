import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "₹";
    const delivery_fee = 60;
    const [search, setSearch] = useState("");
    const [discount, setDiscount] = useState(0);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [product, setProduct] = useState("");
    const [forgetPassword, setForgetPassword] = useState(false);
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const serverURL = "https://luxorabackend.onrender.com/api/v1";
    const token = localStorage.getItem("authToken");

    const addCartItem = async () => {
        try {
            const response = await axios.get(serverURL + "/carts/get", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setCartItems(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getallProducts = async () => {
        try {
            const res = await axios.get(`${serverURL}/products/all`);
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products.");
        }
    };

    useEffect(() => {
        if (token) {
            getallProducts();
            addCartItem();
        }
    }, [token]);

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][size] ? (cartData[itemId][size] += 1) : (cartData[itemId][size] = 1);
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.patch(
                    serverURL + "/carts/add",
                    { itemId, size },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
            } catch (error) {
                console.log("addToCart error" + error);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    totalCount += cartItems[item][size];
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.patch(
                    serverURL + "/carts/update",
                    { itemId, size, quantity },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
            } catch (error) {
                console.log("updateQuantity error" + error);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const productInfo = products.find((product) => product._id === item);
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        totalAmount += productInfo.discountPrice * cartItems[item][size];
                    }
                } catch (error) {
                    console.log("get cart error", error);
                }
            }
        }
        return totalAmount;
    };

    const setItems = () => {
        setOrderItems([]);
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    const itemInfo = structuredClone(products.find((product) => product._id === items));

                    if (itemInfo) {
                        itemInfo.size = size;
                        itemInfo.quantity = cartItems[items][size];
                        orderItems.push(itemInfo);
                    }
                }
            }
        }
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        setCartItems,
        cartItems,
        addToCart,
        token,
        product,
        setProduct,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        serverURL,
        amount,
        setAmount,
        discount,
        setDiscount,
        orderItems,
        setItems,
        forgetPassword,
        setForgetPassword,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ShopContextProvider;
