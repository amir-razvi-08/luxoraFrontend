import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discountPrice, discount }) => {
    return (
        <Link to={`/product/${id}`} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} className="text-gray-700 cursor-pointer">
            <div className="overflow-hidden p-4 shadow-md bg-white">
                <img src={image} alt="" className="sm:w-[15rem] sm:h-[22rem] w-[10rem] h-[15rem] object-cover mb-2 rounded hover:scale-110 transition ease-in-out duration-500 " />
                <p className="pt-3 pb-1 text-sm ">{name}</p>
                <div className="text-sm font-medium">
                    <div className="flex items-baseline gap-2">
                        <span className="mt-5 text-xl font-medium">₹{discountPrice}</span>
                        <span className="line-through pl-1 text-gray-500 text-md"> ₹ {price}</span>
                        <span className="text-green-500 font-semibold text-md">{`( ${discount} % OFF )`}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
