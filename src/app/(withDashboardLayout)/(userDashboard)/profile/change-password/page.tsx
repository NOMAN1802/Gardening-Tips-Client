"use client";
import Container from "@/src/components/Container/Container";
import { ChangePasswordForm } from "@/src/components/modules/Dashboard/ChangePassword/ChangePasswordForm";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import { useUser } from "@/src/context/user.provider";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";


const ChangePassword = () => {

  const {user} = useUser();
  const changePassword = async (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match" };
    }
  
    try {
      const response = await axiosInstance.post("/auth/change-password", {
        id: user?._id, 
        password: newPassword
      });
  
      if (response.data.success) {
        return { success: true };
      } else {
        return { error: response.data.message || "Failed to change password" };
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return { error: "Failed to change password. Please try again." };
    }
  };
  return (
    <Container>
      <PageTitle heading="Change password" subHeading="Set new password"/>
      <div className=" bg-default-100 shadow-lg p-8 rounded-md w-1/2 mx-auto mt-16">
        
        <ChangePasswordForm changePassword={changePassword} />
      </div>
    </Container>
  );
};

export default ChangePassword;
