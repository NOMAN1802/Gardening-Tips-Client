"use client";
import React from 'react';
import { TPost } from '@/src/types';
import PostCard from '../PostCard/PostCard';
import TrandingPostCard from './TrandingPostCard';

interface PostCardProps {
  posts: TPost[];
}

const TrandingPosts: React.FC<PostCardProps> = ({ posts }) => {

  return (
    <>

          <div
            className=" grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-3"
          >
            {posts.map((post) => (
              <TrandingPostCard key={post._id}  post={post} />
            ))}
          </div> 
   </>
  
  );
};

export default TrandingPosts;
