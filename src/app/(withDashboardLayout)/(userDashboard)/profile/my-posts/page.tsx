// "use client"
// import React, { useState, ChangeEvent } from 'react'
// import AddPostModal from "@/src/components/AddPostModal/AddPostModal";
// import { useCreatePost } from '@/src/hooks/post.hook';
// import { useUser } from '@/src/context/user.provider';
// import { toast } from 'sonner';
// import { FieldValues } from "react-hook-form";
// import PageTitle from '@/src/components/PageTitle/PageTitle';

// const MyPostsPage = () => {
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const { user } = useUser();
//   const { mutate: createPost, isPending} = useCreatePost();


//   const onSubmitForm = (data: FieldValues, resetForm: () => void, closeModal: () => void) => {
//     if (!user) {
//       toast.error("You must be logged in to create a post");
//       return;
//     }
  
//     const formData = new FormData();
    
//     const postData = {
//       ...data,
//       author: user!._id,
//     };
  
//     formData.append("data", JSON.stringify(postData));
  
//     for (let image of imageFiles) {
//       formData.append("postImages", image);
//     }
  
//     createPost(formData, {
//       onSuccess: () => {
//         resetForm();
//         closeModal();
//         setImageFiles([]);
//         setImagePreviews([]);
//       },
//       onError: (error) => {
//         console.error("Error creating post:", error);
//       }
//     });
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files![0];
  
//     setImageFiles((prev) => [...prev, file]);
  
//     if (file) {
//       const reader = new FileReader();
  
//       reader.onloadend = () => {
//         setImagePreviews((prev) => [...prev, reader.result as string]);
//       };
  
//       reader.readAsDataURL(file);
//     }
//   }; // Close bracket for handleImageChange here




//   return (
//     <div>
//       <PageTitle heading='My Added post' subHeading='Cooking something interisting'/>
//       <AddPostModal
//         buttonText="Add Post"
//         title="Create New Post"
//         buttonVariant="solid"
//         buttonClassName="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
//         onSubmit={onSubmitForm}
//         handleImageChange={handleImageChange}
//         imagePreviews={imagePreviews}
//         isLoading={isPending}
//       />
//       {/* Add your posts list component here */}
//     </div>
//   )
// }

// export default MyPostsPage;




"use client"
import React, { useState, ChangeEvent } from 'react'
import AddPostModal from "@/src/components/AddPostModal/AddPostModal";
import { useCreatePost, useGetMyPosts } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { toast } from 'sonner';
import { FieldValues } from "react-hook-form";
import PageTitle from '@/src/components/PageTitle/PageTitle';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";

const MyPostsPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { user } = useUser();
  const { mutate: createPost, isPending } = useCreatePost();
  const { data: myPosts, isLoading: isLoadingPosts } = useGetMyPosts(user?._id || "");

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
      onError: (error) => {
        console.error("Error creating post:", error);
      }
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
    <div>
      <PageTitle heading='My Added post' subHeading='Cooking something interesting'/>
      <AddPostModal
        buttonText="Add Post"
        title="Create New Post"
        buttonVariant="solid"
        buttonClassName="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        onSubmit={onSubmitForm}
        handleImageChange={handleImageChange}
        imagePreviews={imagePreviews}
        isLoading={isPending}
      />
      
      {isLoadingPosts ? (
        <p>Loading posts...</p>
      ) : (
        <Table aria-label="My Posts">
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>DETAILS</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
          </TableHeader>
          <TableBody>
            {myPosts?.map((post: any) => (
              <TableRow key={post._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.postDetails.substring(0, 50)}...</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default MyPostsPage;