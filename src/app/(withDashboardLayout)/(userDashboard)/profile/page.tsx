"use client";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import {
  BsCheckCircle,
  BsArrowUpCircle,
  BsPersonPlus,
  BsPersonDash,
} from "react-icons/bs";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { useGetUsers, usePostActions } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { verifyUser } from "@/src/services/UserService";

const UserProfilePage = () => {
  const { user } = useUser();
  const { data: usersData, isLoading, refetch } = useGetUsers();
  const { handleFollow, handleUnfollow, isFollowing, isUnfollowing } =
    usePostActions();
  const router = useRouter();

  const { currentUserData, otherUsers } = useMemo(() => {
    if (!usersData || !user) return { currentUserData: null, otherUsers: [] };

    const currentUser = usersData.data.find((u: IUser) => u._id === user?._id);
    const others = usersData?.data?.filter((u: IUser) => u._id !== user?._id);

    return { currentUserData: currentUser, otherUsers: others };
  }, [usersData, user]);

  const handleFollowAction = async (userToFollow: IUser) => {
    try {
      await handleFollow(userToFollow._id);
      refetch();
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  const handleUnfollowAction = async (userToUnfollow: IUser) => {
    try {
      await handleUnfollow(userToUnfollow?._id);
      refetch();
    } catch (error) {
      console.error("Unfollow error:", error);
    }
  };

  const handleUserVerify = async () => {
    if (currentUserData && !currentUserData?.isVerified) {
      try {
        const result = await verifyUser(currentUserData._id);

        if (result?.success && result?.payment_url) {
          window.location.href = result?.payment_url;
        } else {
          toast.error(result.error || "Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during verification. Please try again.");
      }
    }
  };

  if (isLoading || !user || !currentUserData) {
    return <div>Loading...</div>;
  }
  console.log(currentUserData);

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
                alt={`${currentUserData.name}'s profile`}
                className={`rounded-full ${currentUserData.isVerified ? "ring-4 ring-blue-500" : ""}`}
                src={currentUserData.profilePhoto}
              />
              {currentUserData?.isVerified === true && (
                <Badge
                  className="absolute bottom-0 right-0"
                  shape="circle"
                  variant="flat"
                >
                  <BsCheckCircle className="text-blue-500" />
                </Badge>
              )}
            </div>

            {/* User Info */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-default-800">
                {currentUserData?.name}
              </h2>
              {/* Upvote Count */}
              <div className="mt-2 flex items-center">
                <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                <span className="ml-2 text-default-600">
                  Upvotes: {currentUserData?.upVoteCount || 0}
                </span>
              </div>
              {/* Followers and Following Count */}
              <div className="mt-2">
                <span className="mr-4">
                  Followers: {currentUserData?.followers?.length || 0}
                </span>
                <span>
                  Following: {currentUserData?.following?.length || 0}
                </span>
              </div>
              {/* Favorite Posts Count */}
              <div className="mt-2">
                <span>
                  Favorite Posts: {currentUserData?.favoritePosts?.length || 0}
                </span>
              </div>
            </div>
            {/* Verified Button */}
            <div className="mt-4">
              <Button
                className={`px-4 py-2 rounded-lg ${
                  currentUserData?.isVerified === true
                    ? "bg-blue-500 text-white"
                    : "bg-default-300 text-default-700 hover:bg-blue-400 hover:text-white"
                }`}
                disabled={currentUserData.isVerified}
                onClick={handleUserVerify}
              >
                {currentUserData?.isVerified === true ? (
                  <>
                    <BsCheckCircle className="mr-2" /> Verified
                  </>
                ) : (
                  "Verify Now"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Followers Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Your Following</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentUserData?.following?.map((followingId: string) => {
              const followingUser = otherUsers?.find(
                (u: IUser) => u?._id === followingId,
              );

              return followingUser ? (
                <div
                  key={followingUser?._id}
                  className="bg-default-100 p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Avatar
                      alt={`${followingUser?.name}'s profile`}
                      className="rounded-full"
                      size="sm"
                      src={followingUser?.profilePhoto}
                    />
                    <span className="ml-2 font-semibold">
                      {followingUser?.name}
                    </span>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Right Side - People You May Follow Section */}
      <div className="mt-10 sm:ml-6 sm:w-1/3">
        <h3 className="text-2xl font-bold mb-4">People You May Follow</h3>
        <div className="grid grid-cols-1 gap-6">
          {otherUsers.map((otherUser: IUser) => (
            <div
              key={otherUser?._id}
              className="bg-default-100 p-6 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                {/* Profile Avatar with Verification */}
                <div className="relative">
                  <Avatar
                    alt={`${otherUser?.name}'s profile`}
                    className={`rounded-full ${otherUser?.isVerified === true ? "ring-4 ring-blue-500" : ""}`}
                    size="lg"
                    src={otherUser?.profilePhoto}
                  />
                  {otherUser?.isVerified === true && (
                    <Badge
                      className="absolute bottom-0 right-0"
                      shape="circle"
                      variant="flat"
                    >
                      <BsCheckCircle className="text-blue-500" />
                    </Badge>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">{otherUser?.name}</h4>
                </div>
              </div>

              {/* Follow/Unfollow Button */}
              <div className="flex items-center">
                <Button
                  className={`rounded-lg p-2 hover:shadow-lg ${
                    currentUserData?.following?.includes(otherUser?._id)
                      ? "bg-default-300 text-default-700"
                      : "bg-blue-500 text-white"
                  }`}
                  disabled={isFollowing || isUnfollowing}
                  onClick={() =>
                    currentUserData?.following?.includes(otherUser?._id)
                      ? handleUnfollowAction(otherUser)
                      : handleFollowAction(otherUser)
                  }
                >
                  {currentUserData?.following?.includes(otherUser?._id) ? (
                    <BsPersonDash className="w-5 h-5" />
                  ) : (
                    <BsPersonPlus className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
