"use client";

import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useSettingStore } from "@/store/setting-store";

interface ISettingsModalProps {
  title: string;
  children: ReactNode;
}

export default function SettingsModal({
  title,
  children
}: ISettingsModalProps) {
  const { isSettingsModalOpen, setIsSettingsModalOpen } = useSettingStore(
    (state) => state
  );
  const settingsModalRef = useRef(null);
  const overlayRef = useRef(null);
  const settingsModalContentRef = useRef(null);

  // Handle modal close click outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        settingsModalContentRef.current &&
        !(settingsModalContentRef.current as HTMLElement).contains(
          e.target as Node
        )
      ) {
        setIsSettingsModalOpen(false);
      }
    },
    [setIsSettingsModalOpen]
  );

  // Settings modal animation
  useGSAP(() => {
    if (isSettingsModalOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        display: "block",
        duration: 0.5,
        ease: "power1.in"
      });
      gsap.to(settingsModalRef.current, {
        top: "50%",
        left: "50%",
        display: "flex",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out"
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power1.out"
      });
      gsap.to(settingsModalRef.current, {
        top: "20%",
        left: "50%",
        display: "none",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }, [isSettingsModalOpen]);

  // Handle click outside close modal
  useEffect(() => {
    if (isSettingsModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSettingsModalOpen, handleClickOutside]);

  return (
    <>
      <div
        ref={settingsModalRef}
        className="absolute left-0 top-0 z-20 hidden size-full -translate-x-1/2 -translate-y-1/2  items-center justify-center p-4"
      >
        <div
          ref={settingsModalContentRef}
          className="w-full max-w-xl rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
        >
          <div className="flex items-center justify-between">
            <h1 className="editor-header-title">{title}</h1>
            <button onClick={() => setIsSettingsModalOpen(false)}>
              <X className="size-[20px] text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300" />
            </button>
          </div>

          <div className="my-6">{children}</div>
        </div>
      </div>

      <div
        ref={overlayRef}
        className="absolute left-0 top-0 z-10 hidden size-full bg-black/40"
      ></div>
    </>
  );
}
