import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createComment, deleteComment, editComment } from "../services/PostService";

export const useCreateComment = (postId: string) => {
    return useMutation<any, Error, FormData>(
      (commentData: FormData) => createComment(postId, commentData),
      {
        mutationKey: ["CREATE_COMMENT", postId],
        onSuccess: () => {
          toast.success("Comment created successfully");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create comment");
        },
      }
    );
  };
  
  

  export const useEditComment = (postId: string, commentId: string) => {
    return useMutation<any, Error, FormData>({
      mutationKey: ["EDIT_COMMENT", postId, commentId],
      mutationFn: async (commentData) => await editComment(postId, commentId, commentData),
      onSuccess: () => {
        toast.success("Comment edited successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to edit comment");
      },
    });
  };
  
  export const useDeleteComment = (postId: string, commentId: string) => {
    return useMutation<any, Error>({
      mutationKey: ["DELETE_COMMENT", postId, commentId],
      mutationFn: async () => await deleteComment(postId, commentId),
      onSuccess: () => {
        toast.success("Comment deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete comment");
      },
    });
  };