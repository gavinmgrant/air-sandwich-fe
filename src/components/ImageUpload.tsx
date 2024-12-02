"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BuildingOfficeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type ImageUploadProps = {
  label?: string;
  isUser?: boolean;
  value?: File | null;
  onChange?: (file: File | null) => void;
};

export function ImageUpload({
  label = "Upload Image",
  isUser = true,
  value,
  onChange,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <div className="col-span-full">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <input
          className="-mx-2 w-full cursor-pointer p-2 text-sm file:mr-2 file:cursor-pointer file:rounded-md file:border-none file:bg-gray-50 file:px-3 file:py-2 file:ring-1 file:ring-gray-200 dark:file:bg-slate-800"
          id="file-upload"
          name="file-upload"
          type="file"
          onChange={handleImageChange}
        />

        {preview ? (
          <div className="h-12 w-12 shrink-0 rounded-md border border-gray-200">
            <Image
              className="h-full w-full rounded-md object-contain"
              src={preview}
              alt="Preview"
              width={48}
              height={48}
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gray-200 dark:bg-slate-800">
            {isUser ? (
              <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            ) : (
              <BuildingOfficeIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
