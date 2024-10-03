import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyUser } from "../services/UserService";

// src/hooks/user.hook.ts

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/UserService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    
  });
};

export const useVerifyUser = () => {
  return useMutation<
    { success: boolean; payment_url?: string; error?: string },
    Error,
    string
  >({
    mutationFn: (userId: string) => verifyUser(userId),
    onSuccess: (data) => {
      if (data.success && data.payment_url) {
        // Redirect to payment URL
        window.location.href = data.payment_url;
      } else {
        toast.error(data.error || "Verification failed. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to initiate verification process");
    },
  });
};