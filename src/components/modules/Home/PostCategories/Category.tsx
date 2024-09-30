"use client";

import { useState } from "react";
import PostCard from "@/src/components/PostCard/PostCard";
import { TPost } from "@/src/types";
import { FaThLarge, FaThList } from "react-icons/fa";

interface CategoryProps {
  posts: TPost[];
}

const Category: React.FC<CategoryProps> = ({ posts }) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="container mx-auto my-8">
        
      <div className="grid grid-cols-4 gap-6">
        

        {/* Post and Layout Section */}
        <div className="col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">{posts.length} Posts Found</p>
            {/* Layout Toggle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 ${layout === "grid" ? "bg-default-800 text-white" : "bg-white text-black"}`}
              >
                <FaThLarge /> {/* Grid Icon */}
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 ${layout === "list" ? "bg-default-800 text-white" : "bg-white text-black"}`}
              >
                <FaThList /> {/* List Icon */}
              </button>
            </div>
          </div>

          {/* Posts Display */}
          <div className={`grid ${layout === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-6`}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} layout={layout} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
