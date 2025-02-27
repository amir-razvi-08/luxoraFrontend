import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const PlaceOrderTotal = () => {
    const { currency, delivery_fee, amount } = useContext(ShopContext);

    return (
        <div className="w-full">
            <div className="text-2xl border-b border-gray-300 mb-4">
                <Title text1={"CART"} text2={"TOTAL"} />
            </div>

            <div className="flex flex-col gap-2 mt-8 text-md">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                        {currency} {amount}.00
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>
                        {currency} {delivery_fee}.00
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>Total</p>
                    <p>
                        {currency} {amount === 0 ? 0 : amount + delivery_fee}.00
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderTotal;
