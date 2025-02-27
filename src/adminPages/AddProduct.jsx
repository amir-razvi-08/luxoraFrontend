import React, { useContext, useState } from "react";
import { assets } from "../adminAssets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const AddProduct = () => {
    const { serverURL } = useContext(ShopContext);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        category: "Men",
        subCategory: "Topwear",
        sizes: [],
        bestseller: false,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });

    const setProductValue = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setProductData({ ...productData, [name]: files[0] });
        } else if (type === "checkbox") {
            setProductData({ ...productData, [name]: checked });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const toggleSize = (size) => {
        setProductData((prevData) => {
            const sizes = prevData.sizes.includes(size) ? prevData.sizes.filter((s) => s !== size) : [...prevData.sizes, size];
            return { ...prevData, sizes };
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);
        formData.append("subCategory", productData.subCategory);
        formData.append("sizes", JSON.stringify(productData.sizes));
        formData.append("discount", productData.discount);
        formData.append("bestseller", productData.bestseller);

        ["image1", "image2", "image3", "image4"].forEach((imgKey) => {
            if (productData[imgKey]) {
                formData.append(imgKey, productData[imgKey]);
            }
        });

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(serverURL + "/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                timeout: 60000,
            });

            if (response.data.success) {
                setProductData({
                    name: "",
                    description: "",
                    price: 0,
                    discount: 0,
                    category: "Men",
                    subCategory: "Topwear",
                    sizes: [],
                    bestseller: false,
                    image1: null,
                    image2: null,
                    image3: null,
                    image4: null,
                });
                toast.success("product uploaded successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <main>
            <form onSubmit={handleAddProduct} className="flex flex-col w-full items-start gap-3">
                <div>
                    <p className="mb-2 font-medium text-sm">Upload Images</p>
                    <div className="flex gap-2">
                        {["image1", "image2", "image3", "image4"].map((image, index) => (
                            <label key={index} htmlFor={image}>
                                <img
                                    className="w-20 border border-dashed border-gray-500 h-24"
                                    src={productData[image] ? URL.createObjectURL(productData[image]) : assets.upload_area}
                                    alt="upload area"
                                />
                                <input name={image} onChange={setProductValue} type="file" id={image} hidden />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <p className="mb-2 font-medium text-sm">Product Name</p>
                    <input
                        name="name"
                        onChange={setProductValue}
                        value={productData.name}
                        className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded"
                        type="text"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="w-full">
                    <p className="mb-2 font-medium text-sm">Product Description</p>
                    <textarea
                        name="description"
                        onChange={setProductValue}
                        value={productData.description}
                        className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded"
                        placeholder="Write product description"
                        required
                    />
                </div>

                <div className="flex flex-col sm:gap-6 gap-2 w-full">
                    <div className="flex gap-4">
                        <div>
                            <p className="mb-2 font-medium text-sm">Product Price</p>
                            <input
                                name="price"
                                onChange={setProductValue}
                                value={productData.price}
                                className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded"
                                type="number"
                                placeholder="25SR"
                                required
                            />
                        </div>
                        <div>
                            <p className="mb-2 font-medium text-sm">Discount</p>
                            <input
                                name="discount"
                                onChange={setProductValue}
                                value={productData.discount}
                                className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded"
                                type="number"
                                placeholder="25SR"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div>
                            <p className="mb-2 font-medium text-sm">Product Category</p>
                            <select
                                name="category"
                                onChange={setProductValue}
                                value={productData.category}
                                className="w-full px-3 py-2 border border-gray-400 rounded"
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div>
                            <p className="mb-2 font-medium text-sm">Product SubCategory</p>
                            <select
                                name="subCategory"
                                onChange={setProductValue}
                                value={productData.subCategory}
                                className="w-full px-3 py-2 border border-gray-400 rounded"
                            >
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winterwear">Winterwear</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mb-2 font-medium text-sm">Product Sizes</p>
                    <div className="flex gap-2.5">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div key={size}>
                                <p
                                    className={`cursor-pointer font-semibold bg-slate-200 py-1 px-3 border-2 border-gray-400 rounded ${
                                        productData.sizes.includes(size) ? "border-orange-500 text-orange-600" : ""
                                    }`}
                                    onClick={() => toggleSize(size)}
                                >
                                    {size}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 mt-2">
                    <input name="bestseller" onChange={setProductValue} checked={productData.bestseller} type="checkbox" id="bestseller" />
                    <label htmlFor="bestseller">Add to bestseller</label>
                </div>

                <button className="uppercase bg-black text-white px-3 py-3 rounded" type="submit">
                    Add Product
                </button>
            </form>
        </main>
    );
};

export default AddProduct;
