"use client"
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ChangePasswordFormProps {
  changePassword: (newPassword: string, confirmPassword: string) => Promise<{ success?: boolean; error?: string }>;
}

interface PasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ changePassword }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormInputs>();
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);

  const onSubmit: SubmitHandler<PasswordFormInputs> = async (data) => {
    const result = await changePassword(data.newPassword, data.confirmPassword);
    setStatus(result);
    if (result.success) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-default-700">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register("newPassword", { required: "New password is required" })}
          className="mt-1 py-3 block w-full rounded-md border-default-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-default-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: "Please confirm your new password" })}
          className="mt-1 block py-3 w-full rounded-md border-default-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-default-500 hover:bg-default-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Change Password
      </button>
      {status?.error && <p className="text-red-500 mt-2">{status.error}</p>}
      {status?.success && <p className="text-green-500 mt-2">Password changed successfully. Please log in again.</p>}
    </form>
  );
};