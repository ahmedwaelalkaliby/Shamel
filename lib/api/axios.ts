import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://souqshamel.com/api",
  headers: {
    "Accept": "application/json",
  },

});

// Response interceptor for clean error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 422 Validation Errors
    if (error.response?.status === 422 && error.response.data?.errors) {
      const validationErrors = error.response.data.errors;
      // Join multiple errors for the same field or different fields
      const message = Object.values(validationErrors).flat().join(", ");
      return Promise.reject(new Error(message || "Validation failed"));
    }

    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
