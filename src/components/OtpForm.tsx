"use client";

import React, { use, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { useForm, Controller } from "react-hook-form";
import { useVerifyOtp } from "@/hooks/useOtp";
import { Button } from "@/components/Button";
import { useIsRegistered } from "@/hooks/useIsRegistered";

interface OtpFormValues {
  otp: string[];
}

export function OtpForm() {
  const router = useRouter();
  const { cache } = useSWRConfig();
  const userEmail = cache.get("user-email")?.data as string;
  const {
    isRegistered,
    checkIsRegistered,
    isLoading: isCheckingRegistration,
  } = useIsRegistered();
  const { control, handleSubmit, setValue, watch } = useForm<OtpFormValues>({
    defaultValues: {
      otp: Array(6).fill(""),
    },
  });

  const otpValues = watch("otp");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyOtp, isVerified, isLoading, isError } = useVerifyOtp(
    userEmail,
    otpValues.join(""),
  );

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits or empty values
    setValue(`otp.${index}`, value);

    // Move focus to the next field if input is filled
    if (value && index < otpValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      setValue(`otp.${index - 1}`, "");
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otpValues.length}}$`).test(text)) return;

    const digits = text.split("");
    digits.forEach((digit, index) => {
      setValue(`otp.${index}`, digit);
    });

    inputRefs.current[digits.length - 1]?.focus();
  };

  const onSubmit = async () => {
    if (otpValues.every((digit) => digit)) {
      try {
        const result = await verifyOtp();
        if (result) {
          let isRegistered = await checkIsRegistered(); // Explicitly call the function to check registration
          if (isRegistered) {
            router.push("/dashboard");
          } else {
            router.push("/register");
          }
        } else {
          console.error("OTP verification failed.");
        }
      } catch (err) {
        console.error("Error during OTP verification:", err);
      }
    } else {
      console.error("OTP is incomplete.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-8 grid grid-cols-1 gap-10"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {otpValues.map((_, index) => (
          <Controller
            key={index}
            name={`otp.${index}`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                onPaste={handlePaste}
                className="shadow-xs border-stroke flex w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-center text-3xl font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-900 sm:w-[56px] sm:text-4xl"
              />
            )}
          />
        ))}
      </div>

      <Button
        type="submit"
        variant="solid"
        color="blue"
        className="w-full"
        isLoading={isLoading}
      >
        <span>
          Verify <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>

      {isError && (
        <p className="absolute -bottom-8 text-sm">
          Error occurred while verifying OTP.
        </p>
      )}
    </form>
  );
}
