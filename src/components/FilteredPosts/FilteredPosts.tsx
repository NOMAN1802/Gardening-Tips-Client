"use client";

import { useState, useEffect } from "react";
import PostCard from "@/src/components/PostCard/PostCard";
import { TPost } from "@/src/types";
import { FaThLarge, FaThList, FaFilter } from "react-icons/fa";

interface FiltersPostsProps {
  posts: TPost[];
}

const FilteredPosts: React.FC<FiltersPostsProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>(posts);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minUpvotes, setMinUpvotes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

  const handleFilter = () => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    filtered = filtered.filter((post) => post?.upVotes >= minUpvotes);

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, minUpvotes, searchQuery]);

  const FilterSection = () => (
    <div className={`bg-default-100 rounded-lg p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
      {/* Search Field */}
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="mb-4">
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
    </div>
  );

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        {/* Filter Toggle for Mobile */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-default-500  px-4 py-2 rounded-md w-full flex items-center justify-center"
          >
            <FaFilter className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Section */}
        <aside className="col-span-1 mb-6 md:mb-0">
          <FilterSection />
        </aside>

        {/* Post and Layout Section */}
        <div className="col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <p className="text-2xl font-semibold mb-2 sm:mb-0">{filteredPosts.length} Posts Found</p>
            {/* Layout Toggle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 ${layout === "grid" ? "bg-default-800 text-white" : "bg-white text-black"} rounded`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 ${layout === "list" ? "bg-default-800 text-white" : "bg-white text-black"} rounded`}
              >
                <FaThList />
              </button>
            </div>
          </div>

          {/* Posts Display */}
          <div className={`grid ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-6`}>
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
