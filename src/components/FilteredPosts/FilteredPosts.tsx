"use client";

import { useState, useEffect, useMemo } from "react";
import PostCard from "@/src/components/PostCard/PostCard";
import { TPost } from "@/src/types";
import { FaThLarge, FaThList } from "react-icons/fa";

interface FiltersPostsProps {
  posts: TPost[];
}

const FilteredPosts: React.FC<FiltersPostsProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>(posts);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minUpvotes, setMinUpvotes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Define categories manually
  const categories = ["All", "Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

  // Handle Filters
  const handleFilter = () => {
    let filtered = posts;

    // Search by post title, category, or author name
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by upvotes
    filtered = filtered.filter((post) => post?.upVotes >= minUpvotes);

    setFilteredPosts(filtered);
  };

  console.log(filteredPosts)

  // Reapply filters whenever filter values change
  useEffect(() => {
    handleFilter();
  }, [selectedCategory, minUpvotes, searchQuery]);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-4 gap-6">
        {/* Filter Section */}
        <aside className="col-span-1 bg-default-100 rounded-lg overflow-auto max-h-[calc(100vh-20px)]">
          {/* Search Field */}
          <div className="p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">Search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, or author"
              className="rounded-md px-4 py-2 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md px-4 py-2 w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Upvotes Filter */}
          <div className="p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">Minimum Upvotes</h3>
            <input
              type="number"
              min="0"
              value={minUpvotes}
              onChange={(e) => setMinUpvotes(Number(e.target.value))}
              className="rounded-md px-4 py-2 w-full"
            />
            <p className="text-sm">Upvotes: {minUpvotes}</p>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setMinUpvotes(0);
              setSearchQuery("");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
          >
            Clear Filters
          </button>
        </aside>

        {/* Post and Layout Section */}
        <div className="col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">{filteredPosts.length} Posts Found</p>
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
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} layout={layout} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredPosts;
