import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ListProducts = () => {
    const [productList, setProductList] = useState([]);
    const { serverURL } = useContext(ShopContext);

    const fetchListProducts = async () => {
        try {
            const res = await axios.get(`${serverURL}/products/all`);
            if (res.data.success) {
                setProductList(res.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(`${serverURL}/products/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Product deleted successfully!");
                setProductList(prevList => prevList.filter(product => product._id !== id));
            } else {
                toast.error(response.data.message || "Failed to delete product.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting product.");
        }
    };

    useEffect(() => {
        fetchListProducts();
    }, []);

    return (
        <main className="flex flex-col gap-2">
            <p className="mb-2">All Products List</p>

            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm">
                <b>Images</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Discount</b>
                <b className="text-center">Action</b>
            </div>

            <div>
                {productList.map((product) => (
                    <div
                        key={product._id}
                        className="md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm"
                    >
                        <img className="w-12" src={product.image[0].url} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                        <p>{product.discount}</p>
                        <p
                            onClick={() => handleDelete(product._id)}
                            className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700"
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ListProducts;
