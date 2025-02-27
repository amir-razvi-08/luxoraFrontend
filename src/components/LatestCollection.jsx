import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const latest = products.slice(0, 10);
        setLatestProducts(latest);
    }, [products]);

    return (
        <div className="mb-10">
            <div className="py-8 text-center text-3xl">
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover our newest arrivals that blend style and comfort. Explore the latest trends in fashion, curated just for you.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, idx) => (
                    <ProductItem
                        key={idx}
                        id={item._id}
                        image={item.image[0].url}
                        name={item.name}
                        price={item.price}
                        discountPrice={item.discountPrice}
                        discount={item.discount}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
