import axios from "axios";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { delay } from "@/src/utils/delay";
import { revalidateTag } from 'next/cache';  


export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to create post...");
    }
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create post",
    );
  }
};

export const updatePost = async (
  id: string,
  formData: FormData,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/update-post/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update post...");
    }
  } catch (error: any) {
    console.error("Error updating post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update post",
    );
  }
};

export const deletePost = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/delete-post/${postId}`);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to delete post");
    }
  } catch (error: any) {
    console.error("Error deleting post:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete post",
    );
  }
};

export const getMyPosts = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`posts/user/${id}`);

    return data;
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch user posts",
    );
  }
};

export const getAllPosts = async (type?: string, category?: string) => {
  let fetchOptions: RequestInit = {
    method: "GET",
    cache: "no-store",
  };

  if (type === "isr") {
    fetchOptions = {
      next: {
        tags: ["posts"],
      },
    };
  }

  const url = new URL(`${envConfig.baseApi}/posts`);

  if (category) {
    url.searchParams.append("category", category);
  }

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }

  return res.json();
};

export const getPost = async (id: string) => {
  const res = await fetch(`${envConfig.baseApi}/posts/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

export const createComment = async (
  postId: string,
  commentData: { commentator: string; content: string },
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/posts/${postId}/comments`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // revalidateTag('posts');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create comment");
  }
};

export const editComment = async (
  postId: string,
  commentId: string,
  commentData: FormData,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/${postId}/comments/${commentId}`,
      commentData,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Edit Comment Error:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Edit Comment Error:", error);
    }
    throw error;
  }
};

export const deleteComment = async (
  postId: string,
  commentId: string,
  commentData: FormData,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(
      `/posts/${postId}/comments/${commentId}`,
      {
        data: Object.fromEntries(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error: any) {
    console.error(
      "Delete Comment Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};


export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};
export const getTrandingPosts = async() =>{
  try {
    const {data} = await axiosInstance.get(`/posts?sortBy=-upVoats&limit=4`);
  
    return data;
  
     } catch (error) {

    // console.error("Error fetching users:", error);
    throw error;
    
    }
}

export const getAllPostsClient = async() =>{
  try {
    const {data} = await axiosInstance.get("/posts");
  
    return data;
  
     } catch (error) {

    // console.error("Error fetching users:", error);
    throw error;
    
    }
}


export const getAllTrandingPosts = async (type?: string, wait = false) => {
  let fetchOptions = {};

  if (type === "ssr") {
    fetchOptions = {
      cache: "no-store",
    };
  } else if (type === "isr") {
    fetchOptions = {
      next: {
        tags: ["posts"],
      },
    };
  }

  const res = await fetch(
    `${envConfig.baseApi}/posts?sortBy=-upVoats&limit=4`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }

  if (wait) {
    delay(2000);
  }

  return res.json();
};


