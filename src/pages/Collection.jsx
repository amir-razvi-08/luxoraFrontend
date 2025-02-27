import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, discount, setDiscount, setSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevent");

    const handleClearAll = () => {
        setCategory([]);
        setSubCategory([]);
        setSortType("relevent");
        setDiscount(0);
        setSearch("");
    };

    const toggleCategory = (e) => {
        const value = e.target.value;

        category.includes(value) ? setCategory((prev) => prev.filter((item) => item !== value)) : setCategory((prev) => [...prev, value]);
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;

        subCategory.includes(value) ? setSubCategory((prev) => prev.filter((item) => item !== value)) : setSubCategory((prev) => [...prev, value]);
    };

    const applyFilter = () => {
        if (!products || products.length === 0) return;

        let productsCopy = products.slice();

        if (search) {
            productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }

        productsCopy = productsCopy.filter((item) => item.discount >= discount);

        setFilterProducts(productsCopy);
    };

    const sortProducts = () => {
        if (filterProducts.length === 0) return;

        let filteredProdCopy = [...filterProducts];

        switch (sortType) {
            case "low-high":
                setFilterProducts(filteredProdCopy.sort((a, b) => a.price - b.price));
                break;
            case "high-low":
                setFilterProducts(filteredProdCopy.sort((a, b) => b.price - a.price));
                break;

            default:
                setFilterProducts(() => {
                    applyFilter();
                });

                break;
        }

        setFilterProducts(filteredProdCopy);
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, products]);

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
            <div className="min-w-52 border-r border-gray-300">
                <div className="flex my-2 text-xl items-center justify-between pr-8">
                    <p
                        onClick={() => {
                            setShowFilter(!showFilter);
                        }}
                        className="cursor-pointer gap-2 flex items-center"
                    >
                        Filters
                        <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
                    </p>
                    <p onClick={handleClearAll} className={`text-sm text-red-600 font-semibold cursor-pointer`}>
                        CLEAR ALL
                    </p>
                </div>

                <div className={`pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Men", "Women", "Kids"].map((value) => (
                            <label key={value} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3" value={value} onChange={toggleCategory} checked={category.includes(value)} />
                                {value.toUpperCase()}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={`pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Topwear", "Bottomwear", "Winterwear"].map((value) => (
                            <label key={value} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3" value={value} onChange={toggleSubCategory} checked={subCategory.includes(value)} />
                                {value.toUpperCase()}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex justify-between text-sm sm:text-xl lg:text-2xl mb-4 border-b border-gray-300 pb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />

                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        value={sortType}
                        className="border border-gray-300 text-sm px-2 bg-[#000] rounded text-white"
                    >
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((product) => (
                        <ProductItem
                            key={product._id}
                            id={product._id}
                            image={product.image[0].url}
                            name={product.name}
                            price={product.price}
                            discountPrice={product.discountPrice}
                            discount={product.discount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
