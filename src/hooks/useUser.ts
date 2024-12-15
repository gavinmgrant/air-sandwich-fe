"use client"

import useSWR from "swr";
import { swrFetcher } from "../utils/swrUtils";

export const useUser = (userId: string) => {
  const { data, error, mutate } = useSWR(
    `/users/${userId}`,
    swrFetcher,
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate, // Expose mutate for manual revalidation
  };
};
