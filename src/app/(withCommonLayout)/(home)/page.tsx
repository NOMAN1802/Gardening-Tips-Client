import React, { Suspense } from "react";

import PostCategories from "@/src/components/modules/Home/PostCategories/PostCategories";
import Slider from "@/src/components/modules/Home/Slider/Slider";
import Loading from "@/src/components/Loading/Loading";

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Slider />
      <PostCategories />
    </Suspense>
  );
};

export default HomePage;
