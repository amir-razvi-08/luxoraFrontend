import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Carousel() {
    const settings = {
        dots: true,
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const { setDiscount, navigate } = useContext(ShopContext);

    const handleClick = (value) => {
        setDiscount(value);
        navigate("/collection");
    };

    return (
        <>
            <div>
                <Slider {...settings}>
                    <div onClick={() => handleClick(70)} className="Item w-full sm:w-1/2 cursor-pointer">
                        <img
                            src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698929/jmblczep3a7z5vjrr3o4.jpg"
                            alt=""
                            className="w-full sm:h-96"
                        />
                    </div>
                    <div onClick={() => handleClick(60)} className="Item w-full sm:w-1/2 cursor-pointer">
                        <img
                            src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698930/opdktxv0fgbqicofva8l.jpg"
                            alt=""
                            className="w-full sm:h-96"
                        />
                    </div>
                    <div onClick={() => handleClick(50)} className="Item w-full sm:w-1/2 cursor-pointer">
                        <img
                            src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698931/d8allmaaq2abqivsa2rf.jpg"
                            alt=""
                            className="w-full sm:h-96"
                        />
                    </div>
                    <div onClick={() => handleClick(50)} className="Item w-full sm:w-1/2 cursor-pointer">
                        <img
                            src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698931/enlisfxi7c2hohhrepwe.jpg"
                            alt=""
                            className="w-full sm:h-96"
                        />
                    </div>
                </Slider>
            </div>
        </>
    );
}

export default Carousel;
