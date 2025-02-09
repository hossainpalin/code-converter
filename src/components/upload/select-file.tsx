"use client";

import { FormEvent, useRef } from "react";
import { useUploadStore } from "@/store/upload-store";

interface ISelectFileProps {
  acceptedFileTypes?: string;
}

export default function SelectFile({ acceptedFileTypes }: ISelectFileProps) {
  const { setUploadedFile, setIsUploadModalOpen } = useUploadStore(
    (state) => state
  );
  const fileInputRef = useRef(null);

  // Handle click to open file uploader
  const handleClick = (e: FormEvent) => {
    e.preventDefault();

    if (fileInputRef.current) {
      const inputElement = fileInputRef.current as HTMLInputElement;

      // Remove existing event listener to prevent duplicates
      inputElement.removeEventListener(
        "change",
        handleFileUpload as EventListener
      );
      inputElement.addEventListener(
        "change",
        handleFileUpload as EventListener
      );

      inputElement.click();
    }
  };

  // Handle file upload
  const handleFileUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      setUploadedFile(reader.result as string);
      setIsUploadModalOpen(false);
    };

    // Remove event listener after file is uploaded
    target.removeEventListener("change", handleFileUpload as EventListener);
  };

  return (
    <form
      onSubmit={handleClick}
      className="flex w-full items-center justify-between gap-x-2"
    >
      <input
        className="upload-input"
        type="text"
        placeholder="Select a file to upload"
        readOnly
      />

      <input
        ref={fileInputRef}
        type="file"
        hidden
        className="sr-only"
        accept={acceptedFileTypes || "*"}
      />
      <button type="submit" className="upload-button">
        Select File
      </button>
    </form>
  );
}
