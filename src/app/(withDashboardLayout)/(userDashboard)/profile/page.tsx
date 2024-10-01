"use client";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { BsCheckCircle, BsArrowUpCircle, BsPersonPlus, BsPersonDash } from 'react-icons/bs';
import { useState } from 'react';

const UserProfilePage = () => {
  // Mock user data
  const user = {
    name: "Aiko Nakamura",
    profilePhoto: "your-profile-image-url", 
    upvoteCount: 324, // User's upvote count
    isVerified: false, // Is the user verified
    posts: 14, // Number of posts or contributions
    package: {
      name: "Premium",
      issuedDate: "2024-01-01",
      expiryDate: "2025-01-01",
    },
  };

  // Mock users list
  const usersList = [
    { id: 1, name: "Kazuo Nakamura", profilePhoto: "user1-image-url", isFollowed: false },
    { id: 2, name: "Anusha Patel", profilePhoto: "user2-image-url", isFollowed: true },
    { id: 3, name: "Tuan Nguyen", profilePhoto: "user3-image-url", isFollowed: false },
  ];

  const [followStatus, setFollowStatus] = useState(usersList);

  const toggleFollow = (id: number) => {
    setFollowStatus((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };

  return (
    <div className="flex-1 p-6 text-default-900 bg-default-100 rounded-md">
      {/* Profile Section */}
      <div className="bg-default-100 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row sm:justify-between items-center">
        {/* Left Section - Profile */}
        <div className="flex items-center">
          {/* Profile Avatar */}
          <Avatar
            src={user.profilePhoto}
            className="rounded-full"
            alt={`${user.name}'s profile`}
          />

          {/* User Info */}
          <div className="ml-6">
            {/* Name, Upvote, and Verification Section */}
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-default-800">{user.name}</h2>
              <div className="ml-4 flex items-center space-x-2">
                <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                <span className="text-default-600">{user.upvoteCount}</span>
                {user.isVerified && (
                  <Button
                    disabled
                    className="bg-default-100 text-blue-600 px-4 py-1 rounded-lg flex items-center"
                    
                  >
                    <BsCheckCircle className="text-blue-500 w-4 h-4 ml-1" />
                    Verified
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contribution & Package Info Card */}
        <div className="mt-4 sm:mt-0 bg-default-100 p-4 rounded-lg">
          <div className="text-default-600">
            Contributions: <strong>{user.posts}</strong> posts
          </div>
          <div className="mt-2 text-default-600">
            Package: <strong>{user.package.name}</strong>
          </div>
          <div className="text-sm text-degault-500">
            Issued: {user.package.issuedDate} | Expiry: {user.package.expiryDate}
          </div>
        </div>
      </div>

      {/* Users You May Know Section */}
      <div className="mt-10">
        {/* Add Post Button */}
        <div className="mb-4">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Add Post
          </Button>
        </div>

        {/* List of People You May Follow */}
        <h3 className="text-2xl font-bold">People You May Know</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {followStatus.map((user) => (
            <div
              key={user.id}
              className="bg-default-100 p-6 rounded-lg shadow-lg flex items-center justify-between"
            >
              {/* User Avatar */}
              <div className="flex items-center">
                <Avatar
                  src={user.profilePhoto}
                  size="lg"
                  className="rounded-full"
                  alt={`${user.name}'s profile`}
                />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">{user.name}</h4>
                </div>
              </div>

              {/* Follow/Unfollow Icon */}
              <div onClick={() => toggleFollow(user.id)} className="cursor-pointer">
                {user.isFollowed ? (
                  <BsPersonDash className="text-gray-700 w-6 h-6" />
                ) : (
                  <BsPersonPlus className="text-blue-500 w-6 h-6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
