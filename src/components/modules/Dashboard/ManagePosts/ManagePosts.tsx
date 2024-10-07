"use client";
import Container from '@/src/components/Container/Container';
import DeletePostModal from '@/src/components/DeletePostModal/DeletePostModal';
import Loading from '@/src/components/Loading/Loading';
import PageTitle from '@/src/components/PageTitle/PageTitle';
import { useDeletePost, useGetAllPosts } from '@/src/hooks/post.hook';
import { getAllPosts } from '@/src/services/PostService';
import { TPost } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import React, { useState} from 'react';
import { FaThumbsDown, FaThumbsUp, FaTrash } from 'react-icons/fa';

const ManagePosts = () => {
  
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const { data: posts, isLoading: isLoadingPosts ,refetch } = useGetAllPosts();
   const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
   
   console.log(posts)

   const handleDelete = (post: TPost) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost?._id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          refetch()
          setSelectedPost(null);
        },
      });
    }
  };

  
  return (
    <Container>
      <PageTitle heading='Manage posts' subHeading='Admin Post Management '/>
      <div className="w-full overflow-x-auto">
        {isLoadingPosts ? (
          <Loading /> 
        ) : posts?.data?.posts?.length ? (
          <>
            <Table aria-label="Manage Posts" className="min-w-full">
              <TableHeader>
                <TableColumn className="hidden md:table-cell">IMAGE</TableColumn>
                <TableColumn>TITLE</TableColumn>
                <TableColumn className="hidden md:table-cell">CATEGORY</TableColumn>
                <TableColumn className="hidden md:table-cell">AUTHOR</TableColumn>
                <TableColumn className="hidden lg:table-cell">PREMIUM</TableColumn>
                <TableColumn className="hidden md:table-cell">VOTES</TableColumn>
                <TableColumn className="hidden xl:table-cell">CREATED AT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {posts?.data?.posts?.map((post: TPost) => (
                  <TableRow key={post?._id}>
                    <TableCell className="hidden md:table-cell">
                      <Avatar src={post?.images[0]} alt={post?.title} className="w-10 h-10" />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{post?.title}</span>
                        <span className="text-sm text-default-500 md:hidden">{post?.category}</span>
                        <span className="text-xs text-default-400 md:hidden">{new Date(post?.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Chip size="sm" variant="flat">
                        {post?.category}
                      </Chip>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post?.author?.name || 'Unknown'}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Chip color={post?.isPremium ? 'success' : 'default'} size="sm">
                        {post?.isPremium ? 'Premium' : 'Free'}
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
                          <span>{post?.downVotes}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {new Date(post?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
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
              <DeletePostModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                post={selectedPost}
                onConfirm={confirmDelete}
                isLoading={isDeleting} 
              />
            )}
          </>
        ) : (
          <p className="text-center py-4">No Posts found!!!</p>
        )}
      </div>
    </Container>
  );
};

export default ManagePosts;
