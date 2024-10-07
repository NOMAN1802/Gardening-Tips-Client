import axiosInstance from "@/src/lib/AxiosInstance";

export const PaymentHistory = async () => {
    try {
      const response = await axiosInstance.get('/payment/payment-history'); 
      return response.data; 
    } catch (error: any) {
      console.error("Error fetching Payment History", error);
      throw new Error(
        error.response?.data?.message || error.message || "Failed to fetch Payment History",
      );
    }
  };
  