import envConfig from "@/src/config/envConfig";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the accessToken in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    
    if (accessToken) {
      // Set the Authorization header if the token is available
      config.headers["Authorization"] = `${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
