import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { AiTwotoneDelete } from "react-icons/ai";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, setAmount } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    const handleClick = (value) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        if (value) navigate(value);
        setAmount(getCartAmount());
    };

    useEffect(() => {
        if (products.length > 0) {
            let tempData = [];
            for (const item in cartItems) {
                for (const size in cartItems[item]) {
                    if (cartItems[item][size] > 0) {
                        tempData.push({
                            _id: item,
                            size: size,
                            quantity: cartItems[item][size],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className="pt-14">
            <div className="mb-3 text-2xl">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
                <div className="w-full mr-5 flex flex-col">
                    {cartData.map((item, index) => {
                        const productsData = products.find((product) => product._id === item._id);

                        return (
                            <div
                                key={index}
                                className=" p-7 mb-4 bg-white shadow-md text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-start gap-6 cursor-pointer" onClick={() => handleClick(`/product/${productsData._id}`)}>
                                    <img src={productsData.image[0].url} alt="" className="w-16 sm:w-20" />
                                    <div>
                                        <p className="text-sm sm:text-lg font-medium">{productsData.name}</p>
                                        <p className="text-gray-500">Size: {item.size}</p>

                                        <div className="flex items-center gap-5 mt-2">
                                            <p className="font-semibold">
                                                {currency}
                                                {productsData.discountPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    onChange={(e) => {
                                        e.target.value === "" || e.target.value < 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value));
                                    }}
                                    className="border  max-w-10 sm:max-w-14 px-1 sm:px-2 py-1 "
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <div onClick={() => updateQuantity(item._id, item.size, 0)} className="w-4 mr-4 sm:w-5 cursor-pointer text-3xl">
                                    <AiTwotoneDelete />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className="bg-white p-6 shadow-md">
                        <div className=" sm:w-[350px]">
                            <div className="w-full">
                                <div className="text-2xl border-b border-gray-300 mb-4">
                                    <Title text1={"CART"} text2={"TOTAL"} />
                                </div>

                                <div className="flex flex-col gap-2 mt-8 text-xl">
                                    <div className="flex justify-between">
                                        <p>Total Amount</p>
                                        <p>
                                            {currency} {getCartAmount()}.00
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-end">
                                <button
                                    onClick={() => {
                                        handleClick("/place-order");
                                    }}
                                    className="mt-8 mb-4 px-8 py-4 bg-black text-white text-sm"
                                >
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
