import { useQuery } from "@tanstack/react-query";
import {  favoritePost, followUser, getAllUsers, getUserProfile, unfavoritePost, unfollowUser, updateUserProfile, votePost } from "../services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";


export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, profileData }: { userId: string; profileData: any }) =>
      updateUserProfile(userId, profileData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", variables.userId] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const usePostActions = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const votePostMutation = useMutation({
    mutationFn: ({ postId, voteType,}: { postId: string; voteType: "upvote" | "downvote" }) =>
      votePost(postId, voteType, user?._id!),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myPosts", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", user?._id] });
      toast.success(`You ${variables.voteType}d the post!`);
      return data;
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to vote. Please try again.");
    },
  });


 
  const favoritePostMutation = useMutation({
    mutationFn: (postId: string) => favoritePost(postId, user?._id || ""),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", user?._id] });
      toast.success("Post added to favorites");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add to favorites. Please try again.");
    },
  });

  const unfavoritePostMutation = useMutation({
    mutationFn: (postId: string) => unfavoritePost(postId, user?._id || ""),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      queryClient.invalidateQueries({ queryKey: ["userProfile", user?._id] });
      toast.success("Post removed from favorites");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove from favorites. Please try again.");
    },
  });


  const followUserMutation = useMutation({
    mutationFn: (authorId: string) => followUser(authorId, user?._id || ""),
    onSuccess: (data, authorId) => {
      queryClient.invalidateQueries({ queryKey: ["user", authorId] });
      queryClient.invalidateQueries({ queryKey: ["posts", authorId] });
      toast.success("Follow status updated successfully!");
      return data;
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update follow status. Please try again.");
    },
  });

  const unfollowUserMutation = useMutation({
    mutationFn: (authorId: string) => unfollowUser(authorId, user?._id || ""),
    onSuccess: (data, authorId) => {
      queryClient.invalidateQueries({ queryKey: ["user", authorId] });
      queryClient.invalidateQueries({ queryKey: ["posts", authorId] });
      toast.success("Unfollow status updated successfully!");
      return data;
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update unfollow status. Please try again.");
    },
  });

  const handleVote = async (postId: string, voteType: "upvote" | "downvote") => {
    if (!user) {
      toast.error("Please log in to vote");
      return null;
    }
    return votePostMutation.mutateAsync({ postId, voteType });
  };

   const handleFavorite = async (postId: string) => {
    if (!user) {
      toast.error("Please log in to favorite");
      return null;
    }
    return favoritePostMutation.mutateAsync(postId);
  };

  const handleUnFavorite = async (postId: string) => {
    if (!user) {
      toast.error("Please log in to unfavorite");
      return null;
    }
    return unfavoritePostMutation.mutateAsync(postId);
  };

  const handleFollow = async (authorId: string) => {
    if (!user) {
      toast.error("Please log in to follow");
      return null;
    }
    return followUserMutation.mutateAsync(authorId);
  };

  const handleUnfollow = async (authorId: string) => {
    if (!user) {
      toast.error("Please log in to unfollow");
      return null;
    }
    return unfollowUserMutation.mutateAsync(authorId);
  };

  return {
    handleVote,
    handleFavorite,
    handleUnFavorite,
    handleFollow,
    handleUnfollow,
    isVoting: votePostMutation.isPending,
    isFavoriting: favoritePostMutation.isPending,
    isUnFavoriting: unfavoritePostMutation.isPending,
    isFollowing: followUserMutation.isPending,
    isUnfollowing: unfollowUserMutation.isPending,
  };
};

