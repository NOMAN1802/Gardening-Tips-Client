import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "../services/PaymentService";

export const usePaymentHistory = () => {
    return useQuery({
      queryKey: ['patment-history'], 
      queryFn: PaymentHistory,   
    });
  };