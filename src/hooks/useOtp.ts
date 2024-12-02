"use client";

import useSWR from "swr";
import { swrPoster } from "@/utils/swrFetcher";
import { useState } from "react";

export const useGenerateOtp = (email: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, mutate } = useSWR(null, { fetcher: swrPoster }); // Start with SWR disabled

  const generateOtp = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      await mutate(`/auth/generate-otp?email=${encodeURIComponent(email)}`, {
        revalidate: false, // Prevent SWR from auto-fetching
      });
    } catch (err) {
      console.error("Error generating OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp: data,
    isLoading,
    isError: !!error,
    generateOtp,
  };
};

export const useVerifyOtp = (email: string, otp: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, mutate } = useSWR(null, { fetcher: swrPoster }); // Start with SWR disabled

  const verifyOtp = async () => {
    if (!email || !otp) return;

    setIsLoading(true);
    try {
      await mutate(
        `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${otp}`,
        { revalidate: false }, // Prevent SWR from auto-fetching
      );
    } catch (err) {
      console.error("Error verifying OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isVerified: data,
    isLoading,
    isError: !!error,
    verifyOtp,
  };
};
