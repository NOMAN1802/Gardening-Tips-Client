// @ts-nocheck
"use client";
import React from 'react';
import { TPost } from '@/src/types';
import PostCard from '../PostCard/PostCard';
import TrandingPostCard from './TrandingPostCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';

interface PostCardProps {
  posts: TPost[];
}

const TrandingPosts: React.FC<PostCardProps> = ({ posts }) => {

  return (
    <Container>
      <SectionTitle heading='Tranding Posts'/>
          <div
            className=" grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2"
          >
            {posts.map((post) => (
              <TrandingPostCard key={post._id}  post={post} />
            ))}
          </div> 
   </Container>
  
  );
};

export default TrandingPosts;
