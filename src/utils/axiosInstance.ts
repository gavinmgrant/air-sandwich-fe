/**
 * Configures an Axios instance with shared settings, such as base URL, timeout, and interceptors.
 */

import axios from "axios";
import { errorHandlers } from "@/utils/errorHandlers";

// Helper to manage token (can be refactored to a separate service)
let token: string | null = null;

const getToken = (): string | null => {
  if (!token) {
    token =
      typeof window !== "undefined"
        ? localStorage.getItem("x-access-token")
        : null;
  }
  return token;
};

// Warn if the base URL is missing
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "NEXT_PUBLIC_API_URL is not set. Ensure this is configured in your environment.",
  );
}

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
});

// Request Interceptor: Adds authentication token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    if (authToken) {
      config.headers["x-access-token"] = `Bearer ${authToken}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Outgoing Request:", config);
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor: Handles errors with custom logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error?.response?.data?.error
      ?.code as keyof typeof errorHandlers;

    if (errorHandlers[errorCode]) {
      return errorHandlers[errorCode](axiosInstance, originalRequest);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Unhandled Error:", error.response);
    }

    return Promise.reject(error.response);
  },
);

export default axiosInstance;
