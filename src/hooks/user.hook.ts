import { useQuery } from "@tanstack/react-query";
import { favoritePost, followUser, getAllUsers, votePost } from "../services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { votePost, favoritePost, followUser } from "@/src/services/PostService";
import { useUser } from "@/src/context/user.provider";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    
  });
};



export const usePostActions = (post: any) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const votePostMutation = useMutation({
    mutationFn: ({ postId, voteType, userId }: { postId: string; voteType: "upvote" | "downvote"; userId: string }) =>
      votePost(postId, voteType, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to vote. Please try again.");
    },
  });

  const favoritePostMutation = useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => favoritePost(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update favorites. Please try again.");
    },
  });

  const followUserMutation = useMutation({
    mutationFn: ({ authorId, userId }: { authorId: string; userId: string }) => followUser(authorId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", post.author._id] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update follow status. Please try again.");
    },
  });

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      toast.error("Please log in to vote");
      return;
    }

    try {
      await votePostMutation.mutateAsync({ postId: post._id, voteType, userId: user._id });
      toast.success(`You ${voteType}d the post!`);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to favorite");
      return;
    }

    try {
      await favoritePostMutation.mutateAsync({ postId: post._id, userId: user._id });
      toast.success("Favorites updated successfully!");
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please log in to follow");
      return;
    }

    try {
      await followUserMutation.mutateAsync({ authorId: post.author._id, userId: user._id });
      toast.success(`Follow status updated for ${post.author.name}!`);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  return {
    handleVote,
    handleFavorite,
    handleFollow,
    isVoting: votePostMutation.isPending,
    isFavoriting: favoritePostMutation.isPending,
    isFollowing: followUserMutation.isPending,
  };
};

