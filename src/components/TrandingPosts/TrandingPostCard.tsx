//@ts-nocheck 
"use client";

import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Chip } from '@nextui-org/chip';
import { TPost } from '@/src/types';

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

  const sanitizeAndTruncate = (html: string) => {
    const cleanHtml = sanitizeHtml(html, {
      allowedTags: [], 
    });
    return truncateText(cleanHtml, 20);
  };

  return (
    <div className={`bg-default-100 relative rounded overflow-hidden shadow-xl transform hover:scale-105 duration-300 -right-1 -skew-x-2 ${layout === "list" ? "flex space-x-4 p-4" : ""}`}>
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
        <div className="text-sm text-gray-500 mx-2">Category: {post.category}</div>
        <div>
          <Chip color={post.isPremium ? "success" : "default"} size="sm">
            {post.isPremium ? "Premium" : "Free"}
          </Chip>
        </div>
        <div className="text-sm text-gray-700 mx-2">
          <p>{sanitizeAndTruncate(post.postDetails)}</p>
          <div className="mt-2">
          <Link href={`/posts/${post?._id}`}>
              <span className="text-blue-500">Read more...</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 mx-2 mt-4">
          <Image
            src={post.author.profilePhoto}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm text-gray-700">{post.author.name}</div>
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mx-2">
            <FaThumbsUp className="text-green-500" />
            <span>{post.upVotes}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mx-2">
            <FaThumbsDown className="text-red-500" />
            <span>{post.downVotes}</span>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4 px-2">
        <Link href={`/posts/${post?._id}`}>
            <button className="py-2 px-4 text-sm font-medium text-default-600 border border-default-600 rounded-2xl hover:bg-default-600 hover:text-white transition-colors duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrandingPostCard;
