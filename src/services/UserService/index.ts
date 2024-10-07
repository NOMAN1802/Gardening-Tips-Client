import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};

export const myFavouritePost = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`users/favorites/${userId}`);

    return data;
  } catch (error) {
    // console.error("Error fetching users:", error);
    throw error;
  }
};

export const verifyUser = async (
  userId: string,
): Promise<{ success: boolean; payment_url?: string; error?: string }> => {
  try {
    const response = await axiosInstance.post(`/users/verify/${userId}`);

    // console.log("Server response:", response.data);

    
    if (response.data && response.data.data && response.data.data.payment_url) {
      return { success: true, payment_url: response.data.data.payment_url };
    } else if (response.data && response.data.payment_url) {
     
      return { success: true, payment_url: response.data.payment_url };
    } else {
      // console.error("Unexpected response structure:", response.data);
      throw new Error("Invalid response structure from server");
    }
  } catch (error: any) {
  
    if (error.response) {
      // console.error("Error response:", error.response.data);
    }

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Verification failed. Please try again.",
    };
  }
};

export const votePost = async (
  postId: string,
  voteType: "upvote" | "downvote",
  userId: string,
) => {
  try {
    
    const { data } = await axiosInstance.post(`/posts/${postId}/vote`, {
      voteType,
      userId,
    });

    return data;
  } catch (error: any) {
    
    throw new Error(
      error.response?.data?.message || error.message || "Failed to vote",
    );
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`);

    return data;
  } catch (error: any) {
    
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch user profile",
    );
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, profileData);

    return data;
  } catch (error: any) {
   
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update user profile",
    );
  }
};

export const followUser = async (
  userId: string,
  currentUserId: string,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`users/follow/${userId}`, {
      followerId: currentUserId,
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to follow user",
    );
  }
};

export const unfollowUser = async (
  userId: string,
  currentUserId: string,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`users/unfollow/${userId}`, {
      followerId: currentUserId,
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to unfollow user",
    );
  }
};

export const favoritePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/users/favorite/${postId}`, {
      userId,
    });

    return data;
  } catch (error: any) {
  
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to favorite post",
    );
  }
};
export const unfavoritePost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/users/unfavorite/${postId}`, {
      userId,
    });

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to favorite post",
    );
  }
};


export const changeUserStatus = async (userId: string, status: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/users/changeStatus/${userId}`, { status });

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update user status");
    }
  } catch (error: any) {
    console.error("Error updating user status:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update user status"
    );
  }
};



export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      '/profile',
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
      throw new Error(data.message || "Failed to update Profile...");
    }
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update profile",
    );
  }
};


export const myProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile'); 
    return response.data; 
  } catch (error: any) {
    console.error("Error fetching profile", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch profile",
    );
  }
};
