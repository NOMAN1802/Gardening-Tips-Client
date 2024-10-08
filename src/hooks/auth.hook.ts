import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { changePassword, ChangePasswordData, loginUser, registerUser } from "../services/AuthService";
import { ChangePasswordPayload } from "../types";
import { useUser } from "../context/user.provider";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registered successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};



export const useChangePassword = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (changedData) => await changePassword(changedData),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

