"use client";

import { useState } from "react";
import { useGenerateOtp } from "@/hooks/useOtp";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const { isLoading, isError, otp } = useGenerateOtp(email);

  const handleGenerateOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const emailInput = formData.get("email") as string;
    setEmail(emailInput);
  };

  return (
    <form
      onSubmit={handleGenerateOtp}
      className="mt-8 grid grid-cols-1 gap-y-4"
    >
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <div className="mt-4">
        <Button type="submit" variant="solid" color="blue" className="w-full">
          <span>
            Go <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while generating OTP.</p>}
      {otp && <p>OTP has been sent to your email.</p>}
    </form>
  );
}
