"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'
import { useGenerateOtp } from "@/hooks/useOtp";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const { mutate } = useSWRConfig();
  const { isLoading, isError } = useGenerateOtp(email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    setEmail(emailInput);
    mutate("user-email", emailInput, false);
    router.push('/verify')
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-8 grid grid-cols-1 gap-y-4"
    >
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <div className="mt-4">
        <Button
          type="submit"
          variant="solid"
          color="blue"
          className="w-full"
          isLoading={isLoading}
        >
          <span>
            Go <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </div>
      {isError && (
        <p className="absolute -bottom-8 text-sm">
          Error occurred while generating OTP.
        </p>
      )}
    </form>
  );
}
