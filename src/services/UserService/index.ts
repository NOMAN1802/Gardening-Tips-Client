import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";


export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get('/users');
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



export const verifyUser = async (userId: string): Promise<{ success: boolean; payment_url?: string; error?: string }> => {
  try {
    const response = await axiosInstance.post(`/users/verify/${userId}`);
    console.log("Server response:", response.data);

    // Check if the response has the expected structure
    if (response.data && response.data.data && response.data.data.payment_url) {
      return { success: true, payment_url: response.data.data.payment_url };
    } else if (response.data && response.data.payment_url) {
      // In case the payment_url is directly in the response data
      return { success: true, payment_url: response.data.payment_url };
    } else {
      console.error("Unexpected response structure:", response.data);
      throw new Error("Invalid response structure from server");
    }
  } catch (error: any) {
    console.error("Verification failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Verification failed. Please try again." 
    };
  }
};



type VoteType = "upvote" | "downvote";

export const votePost = async (postId: string, voteType: VoteType, userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/vote`, { voteType, userId });
    return data;
  } catch (error: any) {
    console.error("Error voting:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to vote");
  }
};

export const favoritePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/favorite`, { userId });
    return data;
  } catch (error: any) {
    console.error("Error favoriting post:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to favorite post");
  }
};

export const followUser = async (authorId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/users/${authorId}/follow`, { userId });
    return data;
  } catch (error: any) {
    console.error("Error following user:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to follow user");
  }
};

// Add other existing functions from your PostService here (createPost, updatePost, deletePost, etc.)