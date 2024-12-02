"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Toggle } from "@/components/Toggle";
import { CustomerFormData } from "@/types";

interface CustomerFormProps {
  onClose: () => void;
  activeCustomer?: CustomerFormData;
}

export default function CustomerForm({
  onClose,
  activeCustomer,
}: CustomerFormProps) {
  const { register, handleSubmit, reset, control } = useForm<CustomerFormData>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeCustomer) {
      reset(activeCustomer); // Reset the form with the active customer data
    }
  }, [activeCustomer, reset]);

  const submitDefaultInfo = async (data: CustomerFormData) => {
    // TODO: Implement this function
    // setIsLoading(true);
    // try {
    //   const response = await axiosInstance.post("/customers", data);
    //   return response.data;
    // } catch (error) {
    //   throw new Error(
    //     (error as any).response?.data?.message || "Failed to save customer info"
    //   );
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const onSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    await submitDefaultInfo(data);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <TextField
        label="First name"
        type="text"
        {...register("firstName")}
      />
      <TextField
        label="Last name"
        type="text"
        {...register("lastName")}
      />
      <TextField
        className="col-span-full"
        type="tel"
        label="Phone number"
        {...register("phone")}
      />
      <TextField
        className="col-span-full"
        label="Email address"
        type="email"
        {...register("email")}
      />
      <TextField
        className="col-span-full"
        label="Mailing address"
        type="text"
        {...register("address")}
      />
      <Controller
        name="isRetired"
        control={control}
        render={({ field }) => (
          <Toggle
            label="Retired?"
            text={field.value ? "Yes" : "No"}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <div className="col-span-full mt-4">
        <Button
          type="submit"
          variant="solid"
          color="blue"
          className="w-full"
          isLoading={isLoading}
        >
          <span>Save</span>
        </Button>
      </div>
    </form>
  );
}
