import PostCategories from "@/src/components/modules/Home/PostCategories/PostCategories";
import Slider from "@/src/components/modules/Home/Slider/Slider";
import RecentGardening from "../../../components/modules/Home/RecentGardening/RecentGardening";
import { getAllTrandingPosts } from "@/src/services/PostService";
import TrandingPosts from "@/src/components/TrandingPosts/TrandingPosts";
import { Suspense } from "react";



const HomePage = async() => {
  const posts = await getAllTrandingPosts("isr");
  console.log(posts)
  return (
    <div>
       <Suspense fallback={<div>Loading slider...</div>}>
        <Slider />
      </Suspense>

      <Suspense fallback={<div>Loading categories...</div>}>
        <PostCategories />
      </Suspense>

      <Suspense fallback={<div>Loading trending posts...</div>}>
        <TrandingPosts posts={posts?.data?.posts} />
      </Suspense>

      <Suspense fallback={<div>Loading recent gardening posts...</div>}>
        <RecentGardening />
      </Suspense>
    </div>
  );
};

export default HomePage;
