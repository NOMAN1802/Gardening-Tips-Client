"use client";
import React, { useEffect, useState } from "react";

import PostDetails from "@/src/components/PostDetails/PostDetails";
import { getPost } from "@/src/services/PostService";
import Container from "@/src/components/Container/Container";

type TProps = {
  params: {
    postId: string;
  };
};

const PostDetailsPage: React.FC<TProps> = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post details and set in state
  const fetchPost = async () => {
    try {
      const { data: postData } = await getPost(params.postId);

      setPost(postData);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch post on component mount
  useEffect(() => {
    fetchPost();
  }, [params.postId]);

  if (loading) {
    return (
      <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500" />
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
      <PostDetails post={post} refetchPost={fetchPost} />
    </Container>
  );
};

export default PostDetailsPage;
