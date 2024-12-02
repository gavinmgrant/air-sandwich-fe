"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImageUpload";
import { RegisterFormData } from "@/types";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitDefaultInfo = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/nux/default-info", data);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as any).response?.data?.message || "Failed to submit default info"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Array.from(formData.entries());
    const formValues = Object.fromEntries(formEntries);
    const {
      firstName,
      lastName,
      companyName,
      senderEmailName,
      replyToAddress,
    } = formValues;
    const data = {
      firstName,
      lastName,
      companyName,
      senderEmailName,
      replyToAddress,
      userPhotoUrl: formValues["userPhotoUrl"],
      companyPhotoUrl: formValues["companyPhotoUrl"],
    } as RegisterFormData;
    await submitDefaultInfo(data);
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <TextField
        label="First name"
        name="firstName"
        type="text"
        autoComplete="given-name"
        required
      />
      <TextField
        label="Last name"
        name="lastName"
        type="text"
        autoComplete="family-name"
        required
      />
      <TextField
        className="col-span-full"
        label="Company name"
        name="companyName"
        type="text"
        autoComplete="company-name"
        required
      />
      <ImageUpload label="Your photo" isUser={true} />
      <ImageUpload label="Company logo" isUser={false} />
      <TextField
        className="col-span-full"
        label="Sender email address"
        name="senderEmailName"
        type="email"
        autoComplete="email"
        required
      />
      <TextField
        className="col-span-full"
        label="Reply to email address"
        name="replyToAddress"
        type="email"
        autoComplete="email"
        required
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
