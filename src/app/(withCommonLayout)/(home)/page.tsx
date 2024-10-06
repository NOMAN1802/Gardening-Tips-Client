import PostCategories from "@/src/components/modules/Home/PostCategories/PostCategories";
import Slider from "@/src/components/modules/Home/Slider/Slider";
import RecentGardening from "../../../components/modules/Home/RecentGardening/RecentGardening";
import TrandingPostsPage from "./(tranding)/page";


const HomePage = () => {
  return (
    <div>
      <Slider />
      <PostCategories />
      <TrandingPostsPage/>
      <RecentGardening/>
    </div>
  );
};

export default HomePage;
