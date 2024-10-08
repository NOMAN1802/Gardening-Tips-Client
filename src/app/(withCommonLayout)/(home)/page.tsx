import PostCategories from "@/src/components/modules/Home/PostCategories/PostCategories";
import Slider from "@/src/components/modules/Home/Slider/Slider";
import RecentGardening from "../../../components/modules/Home/RecentGardening/RecentGardening";
import { getAllTrandingPosts } from "@/src/services/PostService";
import TrandingPosts from "@/src/components/TrandingPosts/TrandingPosts";
import { Suspense } from "react";
import Service from "@/src/components/Service/Service";
import Quotes from "@/src/components/Quotes/Quotes";



const HomePage = async() => {
  const posts = await getAllTrandingPosts("isr");
  console.log(posts)
  return (
    <div>
       <Suspense fallback={<div className="text-center text-yellow-500">Loading Home Page...</div>}>
        <Slider />
        <PostCategories />
        <TrandingPosts posts={posts?.data?.posts} />
        <RecentGardening />
        <Service/>
        <Quotes/>
      </Suspense>
    </div>
  );
};

export default HomePage;
