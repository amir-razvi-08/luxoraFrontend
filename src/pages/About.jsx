import OurPolicies from "../components/OurPolicies";
import Title from "../components/Title";

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8">
                <Title text1={"ABOUT"} text2={"US"} />
            </div>
            <div className="flex flex-col md:flex-row gap-16 my-10 justify-between pb-8">
                <img
                    src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698931/rs3fdyssxi5dxsfx7iin.jpg"
                    alt=""
                    className="w-full md:max-w-[450px] "
                />

                <div className="flex flex-col justify-center md:w-2/4 text-gray-600">
                    <b className="text-black text-xl pb-2">
                        Welcome to Luxora: <span className="text-lg font-semibold">Redefining Modern Fashion</span>{" "}
                    </b>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-800">Luxora</span> is more than just an e-commerce platform—it's a movement towards
                        sustainable, stylish, and accessible fashion. Born from a passion for blending luxury with everyday wear, Luxora is committed to
                        delivering high-quality clothing that celebrates individuality while maintaining a strong focus on environmental responsibility.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 pb-2 pt-6">Our Mission</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At Luxora, our mission is to revolutionize the fashion industry by offering premium, sustainable apparel that doesn’t compromise on
                        style or comfort. We aim to empower individuals to express themselves confidently while making conscious choices that contribute to
                        a greener planet.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-16 my-10 justify-between">
                <div className="flex flex-col justify-center md:w-2/4 text-gray-600">
                    <b className="text-black text-xl pb-2">Our Vision</b>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We envision Luxora as a global brand synonymous with ethical fashion and innovation. Our long-term goal is to become a leader in
                        sustainable fashion by continuously evolving our practices, incorporating cutting-edge technologies, and fostering a community that
                        values both style and sustainability.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 pb-2 pt-6">Innovation at the Heart of Luxora</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At Luxora, research and development are integral to our growth and sustainability efforts. We invest in advanced textile
                        technologies, exploring eco-friendly fabrics and sustainable production methods that minimize our environmental footprint.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/dmifc1uai/image/upload/v1739698931/wgkk6qxxxngljedrjn4m.jpg"
                    alt=""
                    className="w-full md:max-w-[450px] "
                />
            </div>

            <div className="pt-8 text-2xl text-center">
                <Title text1={"PRIVACY POLICY"} text2={" & TERMS"} />
            </div>

            <div className=" flex flex-col gap-4 mb-20 text-sm ">
                <OurPolicies />
                <p className="text-sm text-gray-700 mt-6">
                    By using our site, you agree to our terms and conditions, which are designed to ensure a safe and fair shopping experience. We
                    prioritize your privacy and guarantee that your personal data is securely stored and never shared without your explicit consent. Our
                    commitment to transparency means you can shop with confidence, knowing that your information is protected.
                    <br />
                    <br />
                    For any inquiries, feedback, or assistance, feel free to reach out to our dedicated customer service team. Contact us at
                    <span className="text-blue-600 px-1">support@luxora.com</span>
                    or call <span className="font-medium">+1-800-123-4567</span>. We’re here to help you with anything from order tracking to product
                    information.
                </p>
            </div>
        </div>
    );
};

export default About;
