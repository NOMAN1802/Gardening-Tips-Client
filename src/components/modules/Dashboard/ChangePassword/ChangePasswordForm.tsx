"use client";
import React, { useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Input } from "@nextui-org/input"; 
import { Button } from "@nextui-org/button"; 
import { FaSync } from "react-icons/fa";
import SectionTitle from "@/src/components/SectionTitle/SectionTitle";

interface ChangePasswordFormProps {
  changePassword: (newPassword: string, confirmPassword: string) => Promise<{ success?: boolean; error?: string }>;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ changePassword }) => {
  const methods = useForm<FieldValues>();
  const { handleSubmit, formState: { errors }, reset } = methods;
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const result = await changePassword(data.newPassword, data.confirmPassword);
    setStatus(result);
    if (result.success) {
      reset();
    }
    setIsLoading(false);
  };

  return (
    <>
    <SectionTitle heading="Please Enter"/>
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center shadow-md rounded-lg bg-default-200">
      
      <div className="w-full max-w-3xl p-8 bg-default-200 rounded-lg shadow-lg">
      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...methods.register("newPassword", { required: "New password is required" })}
            label="New Password"
            type="password"
            className="w-full"
          />
          {errors.newPassword && <p className="text-red-500 text-xs">{!errors.newPassword.message}</p>}

          <Input
            {...methods.register("confirmPassword", { required: "Please confirm your new password" })}
            label="Confirm New Password"
            type="password"
            className="w-full"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{!errors.confirmPassword.message}</p>}

          <Button
            type="submit"
            className="w-full bg-default-500 hover:bg-default-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            isLoading={isLoading}
          >
            <FaSync className="mr-2" />
            {isLoading ? "Changing..." : "Change Password"}
          </Button>

          {status?.error && <p className="text-red-500 mt-2">{status.error}</p>}
          {status?.success && <p className="text-green-500 mt-2">Password changed successfully. Please log in again.</p>}
        </form>
      </FormProvider>
    </div>
    </div>
    </>
   
  );
};