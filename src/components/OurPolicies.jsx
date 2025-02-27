import { assets } from "../assets/assets";

const OurPolicies = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            <div className="">
                <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5 " />
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">
                    We offer hassle-free exchanges within 7 days,
                    <br />
                    provided items are unused and in original packaging.
                </p>
            </div>
            <div className="">
                <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5 " />
                <p className="font-semibold">7-day return policy</p>
                <p className="text-gray-400">
                    Return products within 7 days for a full refund.
                    <br />
                    Items must be in original condition with tags attached.
                </p>
            </div>
            <div className="">
                <img src={assets.support_img} alt="" className="w-12 m-auto mb-5 " />
                <p className="font-semibold">Best customer support</p>
                <p className="text-gray-400">
                    Our team offers 24/7
                    <br />
                    support for all your queries and assistance needs.{" "}
                </p>
            </div>
        </div>
    );
};

export default OurPolicies;
