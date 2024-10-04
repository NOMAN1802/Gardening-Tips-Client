"use client";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { BsCheckCircle, BsArrowUpCircle, BsPersonPlus, BsPersonDash } from "react-icons/bs";
import { useState, useMemo } from "react";
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
  
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});
  const [isVerifying, setIsVerifying] = useState(false);

  const { currentUserData, otherUsers } = useMemo(() => {
    if (!usersData || !user) return { currentUserData: null, otherUsers: [] };

    const currentUser = usersData.data.find((u: IUser) => u._id === user._id);
    const others = usersData.data
      .filter((u: IUser) => u._id !== user._id)
      .map(({ favoritePosts, following, followers, ...rest }: IUser) => rest);

    return { currentUserData: currentUser, otherUsers: others };
  }, [usersData, user]);

  const toggleFollow = (id: string) => {
    setFollowStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUserVerify = async () => {
    if (currentUserData && !currentUserData.isVerified) {
      setIsVerifying(true);
      try {
        const result = await verifyUser(currentUserData._id);
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

  if (isLoading || !user || !currentUserData) {
    return <div>Loading...</div>;
  }

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
                src={currentUserData.profilePhoto}
                className={`rounded-full ${currentUserData.isVerified ? "ring-4 ring-blue-500" : ""}`}
                alt={`${currentUserData.name}'s profile`}
              />
              {currentUserData.isVerified && (
                <Badge className="absolute bottom-0 right-0" shape="circle" variant="flat">
                  <BsCheckCircle className="text-blue-500" />
                </Badge>
              )}
            </div>

            {/* User Info */}
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-default-800">{currentUserData.name}</h2>
              {/* Upvote Count */}
              <div className="mt-2 flex items-center">
                <BsArrowUpCircle className="text-green-500 w-5 h-5" />
                <span className="ml-2 text-default-600">Upvotes: {currentUserData.upvoteCount || 0}</span>
              </div>
              {/* Followers and Following Count */}
              <div className="mt-2">
                <span className="mr-4">Followers: {currentUserData.followers?.length || 0}</span>
                <span>Following: {currentUserData.following?.length || 0}</span>
              </div>
              {/* Favorite Posts Count */}
              <div className="mt-2">
                <span>Favorite Posts: {currentUserData.favoritePosts?.length || 0}</span>
              </div>
            </div>
            {/* Verified Button */}
            <div className="mt-4">
              <Button
                className={`px-4 py-2 rounded-lg ${
                  currentUserData.isVerified 
                    ? "bg-blue-500 text-white" 
                    : "bg-default-300 text-default-700 hover:bg-blue-400 hover:text-white"
                }`}
                onClick={handleUserVerify}
                disabled={currentUserData.isVerified || isVerifying}
              >
                {currentUserData.isVerified ? (
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
        <h3 className="text-2xl font-bold mb-4">People You May Follow</h3>
        <div className="grid grid-cols-1 gap-6">
          {otherUsers.map((otherUser :IUser) => (
            <div key={otherUser._id} className="bg-default-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div className="flex items-center">
                {/* Profile Avatar with Verification */}
                <div className="relative">
                  <Avatar
                    src={otherUser.profilePhoto}
                    size="lg"
                    className={`rounded-full ${otherUser.isVerified ? "ring-4 ring-blue-500" : ""}`}
                    alt={`${otherUser.name}'s profile`}
                  />
                  {otherUser.isVerified && (
                    <Badge className="absolute bottom-0 right-0" shape="circle" variant="flat">
                      <BsCheckCircle className="text-blue-500" />
                    </Badge>
                  )}
                </div>
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