/**
 * Error handlers for API requests.
 */

import axios from "axios";

// Centralized API endpoints for easier maintainability
const API_ENDPOINTS = {
  REFRESH_TOKEN: "/api/auth/refresh-token",
};

// Utility to clear user session and redirect to login
const clearUserSession = () => {
  console.warn("Clearing user session and redirecting to login...");
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("user");
  window.location.href = "/login";
};

// Error handlers interface
interface ApiRequest {
  _retry?: boolean;
  headers: Record<string, string>;
}

interface AuthPair {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ErrorHandlers {
  ACCESS_TOKEN_EXPIRED: (
    api: (request: ApiRequest) => Promise<any>,
    originalRequest: ApiRequest,
  ) => Promise<any>;
}

// Exported error handlers
export const errorHandlers: ErrorHandlers = {
  ACCESS_TOKEN_EXPIRED: async (api, originalRequest) => {
    try {
      // Check if refresh token exists
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token available.");
        clearUserSession();
        return;
      }

      // Mark request as retry
      const retryRequest = { ...originalRequest, _retry: true };

      // Perform the token refresh
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
      const authPair: AuthPair = await axios.post(
        `${baseUrl}${API_ENDPOINTS.REFRESH_TOKEN}?refreshToken=${refreshToken}`,
      );

      // Store the new tokens
      window.localStorage.setItem("accessToken", authPair.data.accessToken);
      window.localStorage.setItem(
        "refreshToken",
        authPair.data.refreshToken,
      );

      // Update request headers with the new access token
      retryRequest.headers["accessToken"] =
        `Bearer ${authPair.data.accessToken}`;

      // Retry the original request with updated tokens
      return api(retryRequest);
    } catch (refreshError) {
      console.error("Failed to refresh access token:", refreshError);
      clearUserSession();
    }
  },
};
