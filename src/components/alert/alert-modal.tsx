"use client";

import { useEffect, useRef } from "react";
import { TriangleAlert, X } from "lucide-react";
import { useAlertStore } from "@/store/alert-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface IAlertModalProps {
  message?: string | null;
}

export default function AlertModal({ message }: IAlertModalProps) {
  const alertModalRef = useRef(null);

  const { isAlertModalOpen, setIsAlertModalOpen } = useAlertStore(
    (state) => state
  );

  // Alert modal animation
  useGSAP(() => {
    if (isAlertModalOpen) {
      gsap.to(alertModalRef.current, {
        bottom: "0px",
        duration: 0.5,
        ease: "ease.in",
        display: "flex"
      });
    } else {
      gsap.to(alertModalRef.current, {
        bottom: "-57px",
        display: "none",
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }, [isAlertModalOpen]);

  // Enable alert modal after error occurred
  useEffect(() => {
    if (message) {
      setIsAlertModalOpen(true);
    } else {
      setIsAlertModalOpen(false);
    }
  }, [message, setIsAlertModalOpen]);

  return (
    <div
      ref={alertModalRef}
      className="fixed bottom-[-57px] left-0 z-20 flex h-[55px] w-full items-center justify-between gap-x-4 bg-red-700/70 p-4 py-2.5 shadow-md dark:bg-red-700/50"
    >
      {message && (
        <>
          <span className="flex items-center gap-x-3">
            <TriangleAlert className="size-6 text-white" />
            <p className="font-light text-white">
              {message.length > 50 ? `${message.slice(0, 50)}...` : message}
            </p>
          </span>

          <button
            onClick={() => setIsAlertModalOpen(false)}
            className="rounded-lg p-1.5 transition-colors hover:bg-red-700/40 dark:hover:bg-red-700/50"
          >
            <X className="size-[20px] text-white" />
          </button>
        </>
      )}
    </div>
  );
}
