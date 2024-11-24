/**
 * Defines the SWR fetcher, which SWR uses to make API calls.
 */

import axiosInstance from "./axiosInstance";

export const swrFetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export const swrPoster = (url: string, data: any) =>
  axiosInstance.post(url, data).then((res) => res.data);
