"use client";

import { useState } from "react";
import { swrFetcher, swrPoster } from "@/utils/swrFetcher";

export const useGenerateOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [otpResponse, setOtpResponse] = useState<string | null>(null);

  const generateOtp = async (email: string) => {
    if (!email) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await swrPoster(
        `/auth/generate-otp?email=${encodeURIComponent(email)}`,
        {},
      );
      setOtpResponse(response);
    } catch (err) {
      console.error("Error generating OTP:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otpResponse,
    isLoading,
    isError,
    generateOtp,
  };
};

export const useVerifyOtp = (email: string, otp: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const verifyOtp = async () => {
    email = localStorage.getItem("user-email") || email;
    if (!email || !otp) return false;

    setIsLoading(true);
    setIsError(false);

    try {
      const url = `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
      const response = await swrPoster(url, {});
      if (response.accessToken && response.refreshToken) {
        setIsVerified(true);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return true; // Return success
      } else {
        setIsVerified(false);
        return false; // Return failure
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setIsError(true);
      return false; // Return failure on error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isVerified,
    isLoading,
    isError,
    verifyOtp,
  };
};

