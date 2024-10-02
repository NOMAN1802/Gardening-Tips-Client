// src/pages/UserProfilePage.tsx
"use client";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { BsCheckCircle, BsArrowUpCircle, BsPersonPlus, BsPersonDash } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";


const UserProfilePage = () => {
 
  
  // Mock user data
  const user = {
    name: "Aiko Nakamura",
    profilePhoto: "your-profile-image-url", 
    upvoteCount: 324, 
    isVerified: true, 
    posts: 14, 
  };
  // const  {user, isLoading} = useUser();

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
    <div className="flex flex-col sm:flex-row">
      {/* Left Side - Profile Section */}
      <div className="flex-1 p-6 text-default-900 bg-default-100 rounded-md">
        {/* Profile Info Card */}
        <div className="bg-default-100 p-6 rounded-lg shadow-xl">
          <div className="flex items-center justify-between">
            {/* Profile Avatar with Verification */}
            <div className="relative">
              <Avatar
                src={user?.profilePhoto}
                className={`rounded-full ${user?.isVerified ? "ring-4 ring-blue-500" : ""}`}
                alt={`${user?.name}'s profile`}
              />
              {user?.isVerified && (
                <Badge className="absolute bottom-0 right-0" shape="circle" variant="flat">
                  <BsCheckCircle className="text-blue-500" />
                </Badge>
              )}
            </div>

            {/* User Info */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-default-800">{user?.name}</h2>
              {/* Upvote Count */}
              <div className="mt-2 flex items-center">
                <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                <span className="ml-2 text-default-600">Upvotes: {user?.upvoteCount}</span>
              </div>
            </div>
            {/* Verified Button */}
            <div className="mt-4">
              <Button
                className={`px-4 py-2 rounded-lg ${user?.isVerified ? "bg-blue-500 text-white" : "bg-default-300 text-default-700"}`}
                disabled
              >
                {user?.isVerified ? (
                  <>
                    <BsCheckCircle className="mr-2" /> Verified
                  </>
                ) : (
                  "Not Verified"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - People You May Know Section */}
      <div className="mt-10 sm:ml-6 sm:w-1/3">
      

     

        {/* People You May Know Section */}
        <h3 className="text-2xl font-bold mb-4">People You May Follow</h3>
        <div className="grid grid-cols-1 gap-6">
          {followStatus.map((user) => (
            <div key={user.id} className="bg-default-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
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

              {/* Follow/Unfollow with Icons */}
              <div className="flex items-center">
                {user.isFollowed ? (
                  <Button onClick={() => toggleFollow(user.id)} className="bg-default-300 text-default-700 rounded-lg p-2 hover:shadow-lg">
                    <BsPersonDash className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button onClick={() => toggleFollow(user.id)} className="bg-blue-500 text-white rounded-lg p-2 hover:shadow-lg">
                    <BsPersonPlus className="w-5 h-5" />
                  </Button>
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