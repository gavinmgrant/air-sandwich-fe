"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export function ImageUpload({ label = "Upload Image" }: { label?: string }) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

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
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-200 dark:bg-slate-800">
            <BuildingOfficeIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
}
