import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";
import axiosInstance from "@/src/lib/AxiosInstance";
// import { revalidateTag } from "next/cache";


export const getAllPosts = async (type?: string, wait = false, category?: string) => {
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

  if (wait) {
    await delay(2000); 
  }

  return res.json();
};


export const getPost = async( id:string) =>{

    const res = await fetch(`${envConfig.baseApi}/posts/${id}`,{
     cache:"no-store"
    });
    return res.json();
   
}

export const createComment = async (postId: string, commentData: { commentator: string; content: string; }): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/comments`, commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // revalidateTag('posts');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create comment");
  }
};

//   export const editComment = async (postId: string, commentId: string, commentData: FormData): Promise<any> => {
//     try {
//       const { data } = await axiosInstance.patch(`/posts/${postId}/comments/${commentId}`, commentData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       revalidateTag(`post-${postId}-comments`);
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to edit comment");
//     }
//   };
  

//   export const deleteComment = async (postId: string, commentId: string): Promise<any> => {
//     try {
//       const { data } = await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
  
//       revalidateTag(`post-${postId}-comments`);
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to delete comment");
//     }
//   };