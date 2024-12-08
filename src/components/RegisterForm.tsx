"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImageUpload";
import { RegisterFormData } from "@/types";
import { swrPoster } from "@/utils/swrFetcher";

export default function RegisterForm() {
  const { register, handleSubmit, control } = useForm<RegisterFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitDefaultInfo = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as Blob | string);
      });

      //use swrPoster to post the data
      const response = await swrPoster(`/nux/default-info`, formData);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message ||
          "Failed to submit default info",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await submitDefaultInfo(data);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <TextField label="First name" type="text" {...register("firstName")} />
      <TextField label="Last name" type="text" {...register("lastName")} />
      <TextField
        className="col-span-full"
        label="Company name"
        type="text"
        {...register("companyName")}
      />

      <Controller
        name="userPhotoUrl"
        control={control}
        render={({ field }) => (
          <ImageUpload
            label="Your photo"
            isUser={true}
            value={field.value ? new File([field.value], "userPhoto") : null}
            onChange={(file) => {
              field.onChange(file);
            }}
          />
        )}
      />

      <Controller
        name="companyPhotoUrl"
        control={control}
        render={({ field }) => (
          <ImageUpload
            label="Company logo"
            isUser={false}
            value={field.value ? new File([field.value], "companyLogo") : null}
            onChange={(file) => {
              field.onChange(file);
            }}
          />
        )}
      />

      <TextField
        className="col-span-full"
        label="Sender email address"
        type="email"
        {...register("senderEmailName")}
      />
      <TextField
        className="col-span-full"
        label="Reply to email address"
        type="email"
        {...register("replyToAddress")}
      />

      <div className="col-span-full mt-4">
        <Button
          type="submit"
          variant="solid"
          color="blue"
          className="w-full"
          isLoading={isLoading}
        >
          <span>
            Sign up <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </div>
    </form>
  );
}
