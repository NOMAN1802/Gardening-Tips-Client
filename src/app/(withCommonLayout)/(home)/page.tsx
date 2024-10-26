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

  return (
    <div>
      <Suspense fallback={<div className="text-center text-yellow-500">Loading Home Page...</div>}>
      <Slider />
      </Suspense>
      
      
      <Suspense fallback={<div className="text-center text-yellow-500">Loading Home Page...</div>}>
        <PostCategories />
        </Suspense>

       <Suspense fallback={<div className="text-center text-yellow-500">Loading Tranding Posts...</div>}>
         <TrandingPosts posts={posts?.data?.posts} />
        
        </Suspense>
        
        <RecentGardening />
        <Service/>
        
        <Quotes/>
      
    </div>
  );
};

export default HomePage;
