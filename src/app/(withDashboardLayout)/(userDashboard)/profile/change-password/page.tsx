"use client";
import Container from "@/src/components/Container/Container";
import { ChangePasswordForm } from "@/src/components/modules/Dashboard/ChangePassword/ChangePasswordForm";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import SectionTitle from "@/src/components/SectionTitle/SectionTitle";
import { useUser } from "@/src/context/user.provider";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";
import { toast } from "sonner";


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
        toast.success("Password changed successfully")
        return { success: true };
      } else {
        toast.error("Failed tp changed password")
        return { error: response.data.message || "Failed to change password" };
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return { error: "Failed to change password. Please try again." };
    }
  };
  return (
    <>
    <PageTitle heading="Change password" subHeading="Set new password"/>
    <Container>
        
        <ChangePasswordForm changePassword={changePassword} />
      
    </Container>
    </>
    
  );
};

export default ChangePassword;
