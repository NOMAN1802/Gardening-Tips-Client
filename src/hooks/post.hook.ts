import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createComment, createPost, deletePost, getMyPosts, updatePost } from "../services/PostService";
import { Comment } from "../components/Comment/Comment";


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: (data) => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationFn: ({ id, formData }) => updatePost(id, formData),
    onSuccess: (data, variables) => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (postId: string) => {
      const response = await deletePost(postId);
      return response;
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });
};

export const useGetMyPosts = (userId: string) => {
  return useQuery({
    queryKey: ["myPosts", userId],
    queryFn: () => getMyPosts(userId),
    enabled: !!userId,
  });
};

export const useCreateComment = (postId: string) => {
    return useMutation<any, Error, Comment>({
      mutationKey: ["CREATE_COMMENT", postId], 
      mutationFn: async (commentData) => await createComment(postId, commentData),
      onSuccess: () => {
        toast.success("Comment created successfully...");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create comment...");
      },
    });
  };


  

  
//   export const useEditComment = (postId: string, commentId: string) => {
//     return useMutation<any, Error, FormData>({
//       mutationKey: ["EDIT_COMMENT", postId, commentId],
//       mutationFn: async (commentData) => await editComment(postId, commentId, commentData),
//       onSuccess: () => {
//         toast.success("Comment edited successfully");
//       },
//       onError: (error) => {
//         toast.error(error.message || "Failed to edit comment");
//       },
//     });
//   };
  
//   export const useDeleteComment = (postId: string, commentId: string) => {
//     return useMutation<any, Error>({
//       mutationKey: ["DELETE_COMMENT", postId, commentId],
//       mutationFn: async () => await deleteComment(postId, commentId),
//       onSuccess: () => {
//         toast.success("Comment deleted successfully");
//       },
//       onError: (error) => {
//         toast.error(error.message || "Failed to delete comment");
//       },
//     });
//   };