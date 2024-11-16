"use client";

import React, { useRef, useState } from "react";

import { Button } from "@/components/Button";

export function Otp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  interface HandleInputEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInput = (e: HandleInputEvent) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <form action="#" className="mt-10 grid grid-cols-1 gap-10">
      <div className="flex items-center gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="shadow-xs border-stroke flex w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-center text-3xl font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100 dark:focus:bg-slate-900 sm:w-[56px] sm:text-4xl"
          />
        ))}
      </div>

      <Button
        href="/register"
        type="submit"
        variant="solid"
        color="blue"
        className="w-full"
      >
        <span>
          Verify <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>
    </form>
  );
}
