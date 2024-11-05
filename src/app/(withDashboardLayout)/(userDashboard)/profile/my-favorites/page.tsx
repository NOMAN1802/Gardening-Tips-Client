"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import { useUser } from "@/src/context/user.provider";
import PostCard from "@/src/components/PostCard/PostCard";
import { myFavouritePost } from "@/src/services/UserService";
import { TPost } from "@/src/types";
import SectionTitle from "@/src/components/SectionTitle/SectionTitle";

const MyFavouritePage = () => {
  const { user } = useUser();

  const {
    data: favoritePostsResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["favoritePosts", user?._id],
    queryFn: () => myFavouritePost(user?._id as string),
    enabled: !!user?._id,
  });

  console.log(favoritePostsResponse);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const favoritePosts = favoritePostsResponse?.data || [];

  return (
    <>
      <PageTitle heading="My Favourites" subHeading="It is really awesome" />

      <SectionTitle heading="My wishlist"/>
      {favoritePosts.length > 0 ? (
        
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          
          {favoritePosts.map((post: TPost) => (
            <PostCard key={post._id} layout="grid" post={post} postRefetch={refetch} />
          ))}
        </div>
      ) : (
        <p>You haven't favorited any posts yet.</p>
      )}
    </>
  );
};

export default MyFavouritePage;
