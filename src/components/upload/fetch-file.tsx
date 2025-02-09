"use client";

import { FormEvent } from "react";
import { useUploadStore } from "@/store/upload-store";

export default function FetchFile() {
  const { setFetchedFile, setIsUploadModalOpen } = useUploadStore(
    (state) => state
  );

  // Handle fetch file
  const handleFetchUrl = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const url = formData.get("url") as string;

    if (!url) return;
    const res = await fetch(url);
    const value = await res.text();
    setFetchedFile(value);
    setIsUploadModalOpen(false);
  };

  return (
    <form
      onSubmit={handleFetchUrl}
      className="flex w-full items-center justify-between gap-x-2"
    >
      <input
        className="upload-input"
        type="url"
        name="url"
        placeholder="Enter a url to fetch"
      />

      <button type="submit" className="upload-button">
        Fetch URL
      </button>
    </form>
  );
}
