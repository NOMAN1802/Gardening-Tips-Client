// "use client"
// import React, { useState, ChangeEvent } from 'react';
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
// import { useGetMyPosts, useUpdatePost } from '@/src/hooks/post.hook';
// import { useUser } from '@/src/context/user.provider';
// import { Avatar } from "@nextui-org/avatar";
// import { Chip } from "@nextui-org/chip";
// import { Tooltip } from "@nextui-org/tooltip";
// import { Button } from "@nextui-org/button";
// import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// import Loading from '../Loading/Loading';

// import { FieldValues } from "react-hook-form";
// import { TPost } from '@/src/types';
// import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';

// const MyPosts = () => {
//   const { user } = useUser();
//   const { data: myPosts, isLoading: isLoadingPosts } = useGetMyPosts(user?._id as string);
//   const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
//   const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const handleUpdate = (post: TPost) => {
//     setSelectedPost(post);
//     setIsUpdateModalOpen(true);
//     setImagePreviews(post.images || []);
//   };

//   const handleUpdateSubmit = (data: FieldValues, resetForm: () => void, closeModal: () => void) => {
//     if (!selectedPost || !user) return;

//     const formData = new FormData();
//     const postData = {
//       ...data,
//       author: user._id,
//     };
//     formData.append("data", JSON.stringify(postData));

//     for (let image of imageFiles) {
//       formData.append("postImages", image);
//     }

//     updatePost(
//       { id: selectedPost._id, formData },
//       {
//         onSuccess: () => {
//           resetForm();
//           closeModal();
//           setSelectedPost(null);
//           setIsUpdateModalOpen(false);
//           setImageFiles([]);
//           setImagePreviews([]);
//         },
//       }
//     );
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const newImageFiles = Array.from(files);
//       setImageFiles((prev) => [...prev, ...newImageFiles]);
  
//       newImageFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreviews((prev) => [...prev, reader.result as string]);
//         };
//         reader.readAsDataURL(file);
//       });
//     }
//   };

//   const removeImage = (index: number) => {
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDelete = (postId: string) => {
//     // Implement delete logic
//     console.log('Delete post', postId);
//   };

//   return (
//     <div className="w-full overflow-x-auto">
//       {isLoadingPosts ? (
//         <Loading />
//       ) : myPosts?.data?.length ? (
//         <>
//           <Table aria-label="My Posts" className="min-w-full">
//             <TableHeader>
//               <TableColumn className="hidden md:table-cell">IMAGE</TableColumn>
//               <TableColumn>TITLE</TableColumn>
//               <TableColumn className="hidden md:table-cell">CATEGORY</TableColumn>
//               <TableColumn className="hidden lg:table-cell">PREMIUM</TableColumn>
//               <TableColumn className="hidden md:table-cell">VOTES</TableColumn>
//               <TableColumn className="hidden xl:table-cell">CREATED AT</TableColumn>
//               <TableColumn>ACTIONS</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {myPosts.data.map((post: TPost) => (
//                 <TableRow key={post._id}>
//                   <TableCell className="hidden md:table-cell">
//                     <Avatar src={post.images[0]} alt={post.title} className="w-10 h-10" />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-col">
//                       <span className="font-semibold">{post.title}</span>
//                       <span className="text-sm text-default-500 md:hidden">{post.category}</span>
//                       <span className="text-xs text-default-400 md:hidden">{new Date(post.createdAt).toLocaleDateString()}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     <Chip size="sm" variant="flat">{post.category}</Chip>
//                   </TableCell>
//                   <TableCell className="hidden lg:table-cell">
//                     <Chip color={post.isPremium ? "success" : "default"} size="sm">
//                       {post.isPremium ? "Premium" : "Free"}
//                     </Chip>
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     <div className="flex items-center space-x-2">
//                       <div className="flex items-center">
//                         <FaThumbsUp className="mr-1 text-default-500" />
//                         <span>{post.upVotes}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <FaThumbsDown className="mr-1 text-red-500" />
//                         <span>{post.downVotes}</span>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden xl:table-cell">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <Tooltip content="Edit post">
//                         <Button isIconOnly size="sm" variant="light" onPress={() => handleUpdate(post)}>
//                           <FaEdit className="text-default-500" />
//                         </Button>
//                       </Tooltip>
//                       <Tooltip content="Delete post">
//                         <Button isIconOnly size="sm" variant="light" onPress={() => handleDelete(post._id)}>
//                           <FaTrash className="text-red-500" />
//                         </Button>
//                       </Tooltip>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {selectedPost && (
//             <UpdatePostModal
//               isOpen={isUpdateModalOpen}
//               onClose={() => setIsUpdateModalOpen(false)}
//               post={selectedPost}
//               onSubmit={handleUpdateSubmit}
//               isLoading={isUpdating}
//               handleImageChange={handleImageChange}
//               imagePreviews={imagePreviews}
//               removeImage={removeImage}
//             />
//           )}
//         </>
//       ) : (
//         <p className="text-center py-4">You haven't created any posts yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyPosts;

"use client"
import React, { useState, ChangeEvent } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useGetMyPosts, useUpdatePost, useDeletePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import { FieldValues } from "react-hook-form";
import { TPost } from '@/src/types';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';
import DeletePostModal from '../DeletePostModal/DeletePostModal';

const MyPosts = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading: isLoadingPosts } = useGetMyPosts(user?._id as string);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleUpdate = (post: TPost) => {
    setSelectedPost(post);
    setIsUpdateModalOpen(true);
    setImagePreviews(post.images || []);
  };

  const handleUpdateSubmit = (data: FieldValues, resetForm: () => void, closeModal: () => void) => {
    if (!selectedPost || !user) return;

    const formData = new FormData();
    const postData = {
      ...data,
      author: user._id,
    };
    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("postImages", image);
    }

    updatePost(
      { id: selectedPost._id, formData },
      {
        onSuccess: () => {
          resetForm();
          closeModal();
          setSelectedPost(null);
          setIsUpdateModalOpen(false);
          setImageFiles([]);
          setImagePreviews([]);
        },
      }
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newImageFiles]);
  
      newImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = (post: TPost) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedPost(null);
        },
      });
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {isLoadingPosts ? (
        <Loading />
      ) : myPosts?.data?.length ? (
        <>
          <Table aria-label="My Posts" className="min-w-full">
            <TableHeader>
              <TableColumn className="hidden md:table-cell">IMAGE</TableColumn>
              <TableColumn>TITLE</TableColumn>
              <TableColumn className="hidden md:table-cell">CATEGORY</TableColumn>
              <TableColumn className="hidden lg:table-cell">PREMIUM</TableColumn>
              <TableColumn className="hidden md:table-cell">VOTES</TableColumn>
              <TableColumn className="hidden xl:table-cell">CREATED AT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {myPosts.data.map((post: TPost) => (
                <TableRow key={post._id}>
                  <TableCell className="hidden md:table-cell">
                    <Avatar src={post.images[0]} alt={post.title} className="w-10 h-10" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{post.title}</span>
                      <span className="text-sm text-default-500 md:hidden">{post.category}</span>
                      <span className="text-xs text-default-400 md:hidden">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Chip size="sm" variant="flat">{post.category}</Chip>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Chip color={post.isPremium ? "success" : "default"} size="sm">
                      {post.isPremium ? "Premium" : "Free"}
                    </Chip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <FaThumbsUp className="mr-1 text-default-500" />
                        <span>{post.upVotes}</span>
                      </div>
                      <div className="flex items-center">
                        <FaThumbsDown className="mr-1 text-red-500" />
                        <span>{post.downVotes}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Tooltip content="Edit post">
                        <Button isIconOnly size="sm" variant="light" onPress={() => handleUpdate(post)}>
                          <FaEdit className="text-default-500" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete post">
                        <Button isIconOnly size="sm" variant="light" onPress={() => handleDelete(post)}>
                          <FaTrash className="text-red-500" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {selectedPost && (
            <>
              <UpdatePostModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                post={selectedPost}
                onSubmit={handleUpdateSubmit}
                isLoading={isUpdating}
                handleImageChange={handleImageChange}
                imagePreviews={imagePreviews}
                removeImage={removeImage}
              />
              <DeletePostModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                post={selectedPost}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
              />
            </>
          )}
        </>
      ) : (
        <p className="text-center py-4">You haven't created any posts yet.</p>
      )}
    </div>
  );
};

export default MyPosts;