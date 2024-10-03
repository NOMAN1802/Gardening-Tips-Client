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

// export const verifyUser = async (userId: string): Promise<{ success: boolean; payment_url?: string; error?: string }> => {
//   try {
//     const { data } = await axiosInstance.post(`/users/verify/${userId}`);
//     if (data.statusCode === 200 && data.data.payment_url) {
//       return { success: true, payment_url: data.data.payment_url };
//     } else {
//       throw new Error("Invalid response from server");
//     }
//   } catch (error: any) {
//     console.error("Verification failed:", error);
//     return { 
//       success: false, 
//       error: error.response?.data?.message || error.message || "Verification failed. Please try again." 
//     };
//   }
// };

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