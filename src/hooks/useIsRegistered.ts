"use client";

import { useState } from "react";
import { swrFetcher } from "@/utils/swrFetcher";

export const useIsRegistered = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  const checkIsRegistered = async () => {
    setIsLoading(true);
    try {
      const response = await swrFetcher(`/users/isRegistered`);
      setIsRegistered(response);
      return response;
    } catch (err) {
      console.error("Error checking if user is registered:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isRegistered,
    isLoading,
    checkIsRegistered,
  };
};
