"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { memo, useCallback, useEffect, useRef } from "react";
import SelectFile from "./select-file";
import FetchFile from "./fetch-file";
import { useUploadStore } from "@/store/upload-store";

interface IUploadModalProps {
  acceptedFileTypes?: string;
}

function UploadModal({ acceptedFileTypes }: IUploadModalProps) {
  const { isUploadModalOpen, setIsUploadModalOpen } = useUploadStore(
    (state) => state
  );
  const uploadModalRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle modal close click outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !(overlayRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setIsUploadModalOpen(false);
      }
    },
    [setIsUploadModalOpen]
  );

  // Upload modal animation
  useGSAP(() => {
    if (isUploadModalOpen) {
      gsap.to(uploadModalRef.current, {
        scale: 1,
        display: "flex",
        opacity: 1,
        duration: 0.5,
        ease: "elastic.inOut(1, 1)"
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        display: "flex",
        direction: 0.5
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        display: "none",
        direction: 0.5
      });
      gsap.to(uploadModalRef.current, {
        scale: 0,
        display: "none",
        opacity: 0,
        duration: 0.5,
        ease: "elastic.inOut(1, 1)"
      });
    }
  }, [isUploadModalOpen]);

  // Handle click outside close modal
  useEffect(() => {
    if (isUploadModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUploadModalOpen, handleClickOutside]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute left-0 top-0 z-20 hidden size-full items-start justify-center p-4"
    >
      <div
        ref={uploadModalRef}
        className="pointer-events-auto mt-[84px] flex w-full max-w-xl flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
      >
        <SelectFile acceptedFileTypes={acceptedFileTypes} />
        <div className="relative my-4 border-t border-gray-200 dark:border-neutral-700">
          <span className="absolute left-1/2 top-[-28px] flex size-[55px] -translate-x-1/2 items-center justify-center rounded-full border-[10px] border-white bg-gray-200 text-sm font-light text-gray-700 dark:border-neutral-800 dark:bg-neutral-700 dark:text-gray-300">
            OR
          </span>
        </div>
        <FetchFile />
      </div>
    </div>
  );
}

export default memo(UploadModal);
