import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { setSearch } = useContext(ShopContext);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (value.trim() !== "") {
            setSearch(value);
            setValue("");
            navigate("/collection");
        }
    };

    return (
        <div className="">
            <div className="w-full inline-flex items-center justify-center border border-gray-400 ml-1 px-5 py-2 rounded-full ">
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className=" flex-1 outline-none bg-inherit text-sm "
                ></input>
                <img onClick={handleSearch} src={assets.search_icon} alt="" className="w-4 cursor-pointer" />
            </div>
        </div>
    );
};

export default SearchBar;
