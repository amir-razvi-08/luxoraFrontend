import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import NewsLetterBox from "../components/NewsLatterBox";
import Carousel from "../components/Carousel";

function Home() {
    return (
        <div>
            <Carousel />
            <LatestCollection />
            <BestSeller />
            <NewsLetterBox />
        </div>
    );
}

export default Home;
