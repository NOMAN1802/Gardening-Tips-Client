"use client";

import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Chip } from '@nextui-org/chip';
import { TPost } from '@/src/types';
import { useUser } from '@/src/context/user.provider';

interface PostCardProps {
  post: TPost;
  layout?: "grid" | "list";
}

const TrandingPostCard: React.FC<PostCardProps> = ({ post, layout = "grid" }) => {
  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const { user, isLoading } = useUser();

  const sanitizeAndTruncate = (html: string) => {
    const cleanHtml = sanitizeHtml(html, {
      allowedTags: [], 
    });
    return truncateText(cleanHtml, 10);
  };

  return (
    <div className={`bg-default-100 relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 duration-300 transition-all ${layout === "list" ? "flex space-x-4 p-4" : ""}`}>
      <div className={`relative ${layout === "list" ? "w-40 h-40" : "w-full h-80 mb-4"} group`}>
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          sizes={layout === "list" ? "15vw" : "25vw"}
          className="absolute object-cover rounded-md transition-opacity ease-in-out duration-500"
        />
      </div>

      <div className={`flex flex-col ${layout === "list" ? "w-full justify-between" : "items-start my-2 py-2 space-y-2"}`}>
        <div className="font-semibold text-lg text-default-600 mx-2">{post.title}</div>
        <div className='flex items-center justify-between w-full p-2'>
          <div className="text-sm text-default-500">Category: {post.category}</div>
          <Chip color={post.isPremium ? "success" : "default"} size="sm">
            {post.isPremium ? "Premium" : "Free"}
          </Chip>
        </div>
        <div className="text-sm text-default-700 mx-2">
          <p>{sanitizeAndTruncate(post.postDetails)}</p>
        </div>

        <div className="flex items-center justify-between w-full mt-4 mx-2">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaThumbsUp className="text-green-500" />
            <span>{post.upVotes}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaThumbsDown className="text-red-500" />
            <span>{post.downVotes}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full mt-4 p-2">
          <div className='flex items-center justify-center gap-2'>
          <Image
            src={post.author.profilePhoto}
            alt={post.author.name} 
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm text-default-700">{post.author.name}</div>
          </div>
          
       <Link href={user ? `/posts/${post._id}` : "#"} passHref>
      <button
        className={`py-2 px-4 text-sm font-medium border rounded-2xl transition-colors duration-200 ${
          user
            ? "text-default-600 border-default-600 hover:bg-default-600 hover:text-white"
            : "text-gray-400 border-gray-300 cursor-not-allowed"
        }`}
        disabled={!user || isLoading}
      >
        View Details
      </button>
    </Link>
          
        </div>

        
      </div>
    </div>
  );
};

export default TrandingPostCard;