"use client";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { BsCheckCircle, BsArrowUpCircle, BsPersonPlus, BsPersonDash } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyUser } from "@/src/services/UserService";

const UserProfilePage = () => {
  const { user } = useUser();
  const { data: usersData, isLoading } = useGetUsers();
  const router = useRouter();
  console.log(user)
  
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
  const [isVerifying, setIsVerifying] = useState(false);

  const toggleFollow = (id: string) => {
    setFollowStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUserVerify = async () => {
    if (user && !user.isVerified) {
      setIsVerifying(true);
      try {
        const result = await verifyUser(user._id);
        console.log("Verification result:", result); 
        if (result.success && result.payment_url) {
          window.location.href = result.payment_url; 
        } else {
          toast.error(result.error || "Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const otherUsers = usersData?.data.filter((u: IUser) => u._id !== user._id) || [];

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
                src={user.profilePhoto}
                className={`rounded-full ${user.isVerified ? "ring-4 ring-blue-500" : ""}`}
                alt={`${user.name}'s profile`}
              />
              {user.isVerified && (
                <Badge className="absolute bottom-0 right-0" shape="circle" variant="flat">
                  <BsCheckCircle className="text-blue-500" />
                </Badge>
              )}
            </div>

            {/* User Info */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-default-800">{user.name}</h2>
              {/* Upvote Count */}
              <div className="mt-2 flex items-center">
                <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                <span className="ml-2 text-default-600">Upvotes: {user.upvoteCount || 0}</span>
              </div>
              {/* Followers and Following Count */}
              <div className="mt-2">
                <span className="mr-4">Followers: {user.followers?.length || 0}</span>
                <span>Following: {user.following?.length || 0}</span>
              </div>
            </div>
            {/* Verified Button */}
            <div className="mt-4">
              <Button
                className={`px-4 py-2 rounded-lg ${
                  user.isVerified 
                    ? "bg-blue-500 text-white" 
                    : "bg-default-300 text-default-700 hover:bg-blue-400 hover:text-white"
                }`}
                onClick={handleUserVerify}
                disabled={user.isVerified || isVerifying}
              >
                {user.isVerified ? (
                  <>
                    <BsCheckCircle className="mr-2" /> Verified
                  </>
                ) : isVerifying ? (
                  "Verifying..."
                ) : (
                  "Verify Now"
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
          {otherUsers.map((otherUser: IUser) => (
            <div key={otherUser._id} className="bg-default-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
              {/* User Avatar */}
              <div className="flex items-center">
                <Avatar
                  src={otherUser.profilePhoto}
                  size="lg"
                  className="rounded-full"
                  alt={`${otherUser.name}'s profile`}
                />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">{otherUser.name}</h4>
                </div>
              </div>

              {/* Follow/Unfollow with Icons */}
              <div className="flex items-center">
                {followStatus[otherUser._id] ? (
                  <Button onClick={() => toggleFollow(otherUser._id)} className="bg-default-300 text-default-700 rounded-lg p-2 hover:shadow-lg">
                    <BsPersonDash className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button onClick={() => toggleFollow(otherUser._id)} className="bg-blue-500 text-white rounded-lg p-2 hover:shadow-lg">
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


