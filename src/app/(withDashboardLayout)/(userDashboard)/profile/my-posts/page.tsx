"use client"
import React, { useState } from 'react'
import AddPostModal from "@/src/components/AddPostModal/AddPostModal";
import { Button } from '@nextui-org/button';

const MyPostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmitPost = (postData: any) => {
    // Here you would typically send the post data to your backend
    console.log(postData);
    // Implement your post submission logic here
    setIsModalOpen(false);  // Close the modal after submission
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (

  
<AddPostModal
  buttonText="Add Post"
  title="Create New Post"
  onSubmit={handleSubmitPost}
  buttonVariant="solid"
  buttonClassName="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
/>
 
  )
}

export default MyPostsPage