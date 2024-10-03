"use client"

import React, { useState, ChangeEvent } from 'react'
import AddPostModal from "@/src/components/AddPostModal/AddPostModal";
import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { toast } from 'sonner';
import { FieldValues } from "react-hook-form";
import PageTitle from '@/src/components/PageTitle/PageTitle';
import MyPosts from '@/src/components/MyPosts/MyPosts';


const MyPostsPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { user } = useUser();
  const { mutate: createPost, isPending } = useCreatePost();



  const onSubmitForm = (data: FieldValues, resetForm: () => void, closeModal: () => void) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }
  
    const formData = new FormData();
    
    const postData = {
      ...data,
      author: user!._id,
    };
  
    formData.append("data", JSON.stringify(postData));
  
    for (let image of imageFiles) {
      formData.append("postImages", image);
    }
  
    createPost(formData, {
      onSuccess: () => {
        resetForm();
        closeModal();
        setImageFiles([]);
        setImagePreviews([]);
      },
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
  
    setImageFiles((prev) => [...prev, file]);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
  
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <PageTitle heading='My Added Posts' subHeading='Manage and create your posts'/>
        <div className="mt-6">
          <AddPostModal
            buttonText="Create New Post"
            title="Create New Post"
            buttonVariant="solid"
            buttonClassName="bg-gradient-to-r from-default-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            onSubmit={onSubmitForm}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews}
            isLoading={isPending}
          />
        </div>
      </div>
      
      <div className="bg-default-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Posts</h2>
        <MyPosts />
      </div>
    </div>
  )
}

export default MyPostsPage;