"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGenerateOtp } from "@/hooks/useOtp";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const router = useRouter();
  const { generateOtp, isLoading, isError } = useGenerateOtp();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    const emailInput = data.email;
    // set email to localStorage
    localStorage.setItem("user-email", emailInput);
    await generateOtp(emailInput);
    if (!isError) {
      router.push("/verify");
    }
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
