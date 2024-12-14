import { useState } from "react";

export const useMediaUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string>("");

  const openFilePicker = (fileInputRef: HTMLInputElement) => {
    fileInputRef.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      setSelectedFile(input.files[0]);
      await showImagePreview();
    }
  };

  const showImagePreview = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setSrc(event.target?.result as string);
      };
      await reader.readAsDataURL(selectedFile);
    } else {
      setSrc("");
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setSrc("");
  };

  return {
    selectedFile,
    src,
    openFilePicker,
    handleFileChange,
    removeImage,
  };
};
