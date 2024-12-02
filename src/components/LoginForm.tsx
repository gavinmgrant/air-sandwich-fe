"use client";

import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGenerateOtp } from "@/hooks/useOtp";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default function LoginForm() {
  const { register, handleSubmit, getValues } = useForm<{ email: string }>();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const value = getValues("email");
  const { isLoading, isError } = useGenerateOtp(value);

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    const emailInput = data.email;
    mutate("user-email", emailInput, false);
    router.push("/verify");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-8 grid grid-cols-1 gap-y-4"
    >
      <TextField
        label="Email address"
        type="email"
        {...register("email", { required: true })}
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
