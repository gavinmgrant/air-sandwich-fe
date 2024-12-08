/**
 * Defines the SWR fetcher, which SWR uses to make API calls.
 */

import axiosInstance from "./axiosInstance";

export const swrFetcher = (url: string) => {
  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");
  // Add the Authorization header if the access token exists
  return axiosInstance
    .get(url, {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
    .then((res) => res.data);
};

export const swrPoster = (url: string, data: any) => {
  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");
  // Add the Authorization header if the access token exists
  return axiosInstance
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
    .then((res) => res.data);
};
