// import React from 'react'
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
// import { useGetMyPosts } from '@/src/hooks/post.hook';
// import { useUser } from '@/src/context/user.provider';
// const MyPosts = () => {
//      const {user} = useUser()
//      console.log('user id', user?._id)
//     const { data: myPosts, isLoading: isLoadingPosts } = useGetMyPosts(user?._id as string);
//     console.log('My Posts', myPosts)
//   return (
//     <div>  {isLoadingPosts ? (
//         <p>Loading posts...</p>
//       ) : (
//         <Table aria-label="My Posts">
//           <TableHeader>
//             <TableColumn>TITLE</TableColumn>
//             <TableColumn>CATEGORY</TableColumn>
//             <TableColumn>DETAILS</TableColumn>
//             <TableColumn>CREATED AT</TableColumn>
//           </TableHeader>
//           <TableBody>
//             {myPosts?.data?.map((post: any) => (
//               <TableRow key={post._id}>
//                 <TableCell>{post.title}</TableCell>
//                 <TableCell>{post.category}</TableCell>
//                 <TableCell>{post.postDetails.substring(0, 50)}...</TableCell>
//                 <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}</div>
//   )
// }

// export default MyPosts

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useGetMyPosts } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const MyPosts = () => {
  const { user } = useUser();
  const { data: myPosts, isLoading: isLoadingPosts } = useGetMyPosts(user?._id as string);

  const handleUpdate = (postId: string) => {
    // Implement update logic
    console.log('Update post', postId);
  };

  const handleDelete = (postId: string) => {
    // Implement delete logic
    console.log('Delete post', postId);
  };

  return (
    <div className="w-full overflow-x-auto">
      {isLoadingPosts ? (
        <p className="text-center py-4">Loading posts...</p>
      ) : myPosts?.data?.length ? (
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
            {myPosts.data.map((post: any) => (
              <TableRow key={post._id}>
                <TableCell className="hidden md:table-cell">
                  <Avatar src={post.images[0]} alt={post.title} className="w-10 h-10" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{post.title}</span>
                    <span className="text-sm text-gray-500 md:hidden">{post.category}</span>
                    <span className="text-xs text-gray-400 md:hidden">{new Date(post.createdAt).toLocaleDateString()}</span>
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
                      <FaThumbsUp className="mr-1 text-blue-500" />
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
                      <Button isIconOnly size="sm" variant="light" onPress={() => handleUpdate(post._id)}>
                        <FaEdit className="text-blue-500" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete post">
                      <Button isIconOnly size="sm" variant="light" onPress={() => handleDelete(post._id)}>
                        <FaTrash className="text-red-500" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center py-4">You haven't created any posts yet.</p>
      )}
    </div>
  );
};

export default MyPosts;