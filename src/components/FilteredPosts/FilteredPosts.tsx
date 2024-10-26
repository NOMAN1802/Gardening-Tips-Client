"use client";

import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import PostCard from "@/src/components/PostCard/PostCard";
import { TPost } from "@/src/types";
import Container from "../Container/Container";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { BsCheckCircle } from "react-icons/bs";

interface FiltersPostsProps {
  posts: TPost[];
}

const FilteredPosts: React.FC<FiltersPostsProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minUpvotes, setMinUpvotes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Vegetables",
    "Flowers",
    "Landscaping",
    "Herb",
    "Indoor",
    "Fruits",
  ];

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

  const getUserPostCount = () => {
    const userPostCount: { [key: string]: { name: string; email: string; count: number; profilePhoto: string,
      isVerified : boolean
       } } = {};
  
    filteredPosts.forEach((post) => {
      const { author } = post;
      if (!userPostCount[author.email]) {
        userPostCount[author.email] = { 
          name: author.name, 
          email: author.email, 
          count: 0, 
          profilePhoto: author.profilePhoto,
          isVerified: author?.isVerified 
        };
      }
      userPostCount[author.email].count += 1;
    });
  
    return Object.values(userPostCount);
  };
  
  const userPostCounts = getUserPostCount();
 console.log(filteredPosts)
  return (
     <Container>
      <h1 className="text-xl lg:text-3xl 2xl:text-5xl p-4">All Posts</h1>
      <div className="md:grid md:grid-cols-5 md:gap-8">
        {/* Filter Toggle for Mobile */}
        <div className="md:hidden mb-4">
          <button
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-default-500 px-4 py-2 rounded-md w-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className={`mr-2 transform transition-transform duration-200 ${showFilters ? "rotate-180" : "rotate-0"}`} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Section */}
        <aside className="col-span-1 mb-6 md:mb-0">
        <p className="text-2xl font-semibold mb-4">
             Search & Filter
          </p>
        <div
      className={`bg-default-100 shadow-lg rounded-lg p-6 transform transition-all duration-300 ease-in-out ${
        showFilters ? "block" : "hidden md:block"
      }`}
    >
      {/* Search Field */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Search</h3>
        <input
          className="rounded-md px-4 py-2 w-full border border-default-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Search by title, category, or author"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Category</h3>
        <select
          className="rounded-md px-4 py-2 w-full border border-default-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Upvotes Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Minimum Upvotes</h3>
        <input
          className="rounded-md px-4 py-2 w-full border border-default-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          min="0"
          type="number"
          value={minUpvotes}
          onChange={(e) => setMinUpvotes(Number(e.target.value))}
        />
        <p className="text-sm mt-2">Upvotes: {minUpvotes}</p>
      </div>

      {/* Clear Filters */}
      <button
        className="bg-gradient-to-r from-default-400 to-purple-600  px-4 py-2 rounded-md w-full hover:shadow-lg transition-all duration-200"
        onClick={() => {
          setSelectedCategory("All");
          setMinUpvotes(0);
          setSearchQuery("");
        }}
      >
        Clear Filters
      </button>
    </div>
        </aside>

        {/* Post Section */}
        <div className="col-span-3">
          <p className="text-2xl font-semibold mb-4">
            {filteredPosts.length} Posts Found
          </p>

          {/* Posts Display */}
          <div className="grid grid-cols-1 gap-6 mb-4">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>

       {/* User-wise Post Count Section */}
  <aside className="col-span-1 mt-6 md:mt-0">
  <h3 className="text-2xl font-semibold mb-4">User Wise Post</h3>
  <div className="bg-default-100 rounded-lg p-4 shadow-md">
    {userPostCounts.map((user) => (
      <div
        key={user.email}
        className="mb-4 p-4 border border-default-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-r from-default-300 to-purple-300 flex items-center"
      >
       
        <div className="mx-auto px-4">
        <div className="relative">
                  <Avatar
                    alt={`${user?.name}'s profile`}
                    className={`rounded-full ${user?.isVerified === true ? "ring-4 ring-blue-500" : ""}`}
                    size="lg"
                    src={user?.profilePhoto}
                  />
                  {user?.isVerified === true && (
                    <Badge
                      className="absolute bottom-0 right-0"
                      shape="circle"
                      variant="flat"
                    >
                      <BsCheckCircle className="text-blue-500" />
                    </Badge>
                  )}
                </div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-sm ">{user.email}</p>
          <p className="text-sm">Posts: {user.count}</p>
        </div>
      </div>
    ))}
  </div>
</aside>
      </div>
      </Container>
  );
};

export default FilteredPosts;