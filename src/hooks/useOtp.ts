"use client";

import useSWR from "swr";
import { swrFetcher } from "../utils/swrFetcher";

export const useGenerateOtp = (email: string) => {
  const { data, error, mutate } = useSWR(
    `/auth/generate-otp?email=${encodeURIComponent(email)}`,
    swrFetcher,
  );

  return {
    otp: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate, // Expose mutate for manual revalidation
  };
};

export const useVerifyOtp = (email: string, otp: string) => {
  const { data, error, mutate } = useSWR(
    `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${otp}`,
    swrFetcher,
  );

  return {
    isVerified: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate, // Expose mutate for manual revalidation
  };
};
