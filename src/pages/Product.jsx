import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProduct";
import { HiShoppingBag } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productsData, setProductsData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("M");

    const fetchProductsData = async () => {
        products.map((product) => {
            if (product._id === productId) {
                setProductsData(product);
                setImage(product.image[0]);

                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductsData();
    }, [productId, products]);

    return productsData ? (
        <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
                    <div className="flex sm:flex-col  overflow-x-auto sm:overflow-y-scroll justify-between  sm:justify-normal sm:w-[18.7%] w-full">
                        {productsData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item.url}
                                alt="product"
                                onClick={() => setImage(item)}
                                className="cursor-pointer w-[24%]  sm:w-full sm:mb-3 flex-shrink-0  object-cover"
                            />
                        ))}
                    </div>

                    <div className="w-full sm:w-[80%]">
                        <img src={image.url} alt="product" className="w-full h-auto object-cover" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="border-b border-gray-400 pb-4">
                        <h1 className="font-medium text-2xl mt-2">{productsData.name}</h1>
                        <p className="text-gray-500">{productsData.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-xl ">
                            4.1
                            <div className="pl-2 text-gray-500 flex items-center gap-2 ">
                                <span className="text-[#14938b] pl-2 border-l border-gray-500">
                                    <FaStar />
                                </span>
                                [122 Rating]
                            </div>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-4">
                        <span className="mt-5 text-3xl font-medium">
                            {currency}
                            {productsData.discountPrice}
                        </span>
                        <span className="text-gray-500 text-xl">
                            MRP
                            <span className="line-through pl-1">
                                {currency}
                                {productsData.price}
                            </span>
                        </span>
                        <span className="text-orange-500 font-semibold">{`( ${productsData.discount} % OFF )`}</span>
                    </div>
                    <p className=" text-[#146b73] md:w-4/5 font-semibold ">inclusive of all taxes</p>

                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-semibold">SELECT SIZE</p>
                        <div className="flex gap-2">
                            {productsData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSize(item);
                                    }}
                                    className={`w-10 h-10 border rounded-full bg-gray-100 flex items-center justify-center cursor-pointer
                                      ${item === size ? "border-orange-500 border-2 text-orange-500" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        onClick={() => addToCart(productsData._id, size)}
                        className="flex gap-2 items-center bg-black text-white py-3 px-8 text-xl active:bg-gray-700 w-56 cursor-pointer"
                    >
                        <HiShoppingBag />
                        <span className="text-lg">ADD TO CART</span>
                    </div>

                    <hr className="mt-8 sm:w-4/5" />

                    <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
                        <p>100% Original product </p>
                        <p>Free delivery on order above $49</p>
                        <p> Easy return and exchange policy within 7 days </p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex">
                    <b className="px-5 py-3 text-sm border">Description</b>
                    <p className="px-5 py-3 text-sm border">Reviews (122)</p>
                </div>

                <div className=" flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
                    <p>
                        Ane-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It
                        serves as a vietual marketplace where businesses and individuals.com showcase ther produch, interact with customers, and conduct
                        fransactions without the need for a physical presence. E-commerce websites have goned immense popularity due to their convenience,
                        accessibility, and the global reach they offer.
                    </p>
                    <p>
                        E-commerce websites typically display products or services along with defailed descriptions, images, prices, and any ovalable
                        variations (eg, sizes colors). Each product uwaly has its ww dedicated page with relevant infurroution
                    </p>
                </div>
            </div>

            <RelatedProducts category={productsData.category} subCategory={productsData.subCategory} />
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
