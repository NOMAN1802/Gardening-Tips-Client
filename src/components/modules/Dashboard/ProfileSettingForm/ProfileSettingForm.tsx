"use client"
import React, { useState, ChangeEvent, useMemo } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Input } from "@nextui-org/input"; 
import { Button } from "@nextui-org/button"; 
import { BsUpload } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import {  useMyProfile, useUpdateProfile } from "@/src/hooks/user.hook";
import SectionTitle from "@/src/components/SectionTitle/SectionTitle";

const ProfileSettingForm = () => {

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const [imagePreviews, setImagePreviews] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const methods = useForm<FieldValues>();

  const {data: user, refetch, isLoading} = useMyProfile();
  console.log(user?.data)
  const currentUser = user?.data;

  const handleUpdateSubmit = (data: FieldValues) => {
    if (!currentUser) return;

    const formData = new FormData();
    const profileData = { ...data };

    formData.append("data", JSON.stringify(profileData));

    // Use imageFile instead of profilePhoto
    if (imageFile) {
      formData.append("profilePhoto", imageFile);
    }

    updateProfile(
      { formData },
      {
        onSuccess: (updateUser) => {
          methods.reset(); 
          setImageFile(null); 
          setImagePreviews(null);
          refetch(); 
          
        },
      }
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreviews(null);
    setImageFile(null);
  };



  return (
   <>
   <SectionTitle heading="Update profile"/>
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center shadow-md rounded-lg bg-default-100">
        
        <div className="w-full max-w-3xl p-8 bg-default-300 rounded-lg shadow-lg">
          
  
          <FormProvider {...methods}>
            <form className="space-y-6" onSubmit={methods.handleSubmit(handleUpdateSubmit)}>
              <Input
                {...methods.register("name", { required: "Name is required" })}
                label="Name"
                placeholder="Enter your name"
                className="w-full"
              />
              <Input
                {...methods.register("mobileNumber", { required: "Mobile Number is required" })}
                label="Mobile Number"
                placeholder="Enter your mobile number"
                className="w-full"
              />
              <div className="mt-4">
                <label className="cursor-pointer bg-default-500 text-white py-3 px-6 rounded-md hover:bg-default-600 transition duration-300">
                  <BsUpload className="inline-block mr-2" />
                  Choose Profile Photo
                  <input
                    accept="image/*"
                    className="hidden"
                    name="profilePhoto"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {imagePreviews && (
                <div className="relative my-5">
                  <div className="size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                    <img
                      alt="Profile Photo"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imagePreviews}
                    />
                    <button
                      className="absolute top-1 right-1 bg-default-800 text-white rounded-full p-1 hover:bg-default-600 transition duration-300"
                      type="button"
                      onClick={removeImage}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Button
                  className="w-2/3 py-3 mx-auto"
                  color="default"
                  disabled={isLoading} 
                  isLoading={isLoading} 
                  type="submit"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
   </>
  );
};

export default ProfileSettingForm;
