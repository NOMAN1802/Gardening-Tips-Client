import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createComment, createPost } from "../services/PostService";
import { Comment } from "../components/Comment/Comment";


export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
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



// export const useCreateComment = (postId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, Comment>({
//     mutationKey: ["CREATE_COMMENT", postId],
//     mutationFn: async (commentData) => await createComment(postId, commentData),
//     onSuccess: (newComment) => {
//       toast.success("Comment created successfully...");
//       queryClient.setQueryData(["post", postId], (oldData: any) => {
//         return {
//           ...oldData,
//           comments: [...(oldData.comments || []), newComment],
//         };
//       });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to create comment...");
//     },
//   });
// };
  

  
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