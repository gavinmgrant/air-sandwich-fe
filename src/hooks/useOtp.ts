"use client";

import useSWR from "swr";
import { swrPoster } from "@/utils/swrFetcher";

export const useGenerateOtp = (email: string) => {  
  const { data, error, mutate } = useSWR(
    `/auth/generate-otp?email=${encodeURIComponent(email)}`,
    { fetcher: swrPoster },
  );

  return {
    otp: data,
    isLoading: !error && !data,
    isError: email && !!error,
    mutate, // Expose mutate for manual revalidation
  };
};

export const useVerifyOtp = (email: string, otp: string) => {
  const { data, error, mutate } = useSWR(
    `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${otp}`,
    { fetcher: swrPoster },
  );

  return {
    isVerified: data,
    isLoading: !error && !data,
    isError: email && otp && !!error,
    mutate, // Expose mutate for manual revalidation
  };
};
