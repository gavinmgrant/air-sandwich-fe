"use client";

import { useState, useEffect, use } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Toggle } from "@/components/Toggle";
import { formatPhoneNumber } from "@/utils/formatNumbers";

interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isRetired: boolean;
}

export default function CustomerForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "Test",
    lastName: "Person",
    phone: "5555555555",
    email: "test@email.com",
    isRetired: false,
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitDefaultInfo(formData);
    onClose();
  };

  useEffect(() => {
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   phone: "",
    //   email: "",
    //   isRetired: false,
    // });
  }, []);

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
        value={formData.firstName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
        }
        required
      />
      <TextField
        label="Last name"
        name="lastName"
        type="text"
        autoComplete="family-name"
        value={formData.lastName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
        }
        required
      />
      <TextField
        className="col-span-full"
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        value={formatPhoneNumber(formData.phone)}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
        required
      />
      <TextField
        className="col-span-full"
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
      <Toggle
        label="Retired?"
        enabled={formData.isRetired}
        onToggle={(isRetired) =>
          setFormData((prev) => ({ ...prev, isRetired }))
        }
        text={formData.isRetired ? "Yes" : "No"}
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
