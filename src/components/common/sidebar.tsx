import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Search from "@/components/common/search";
import Menu from "@/components/common/menu";
import Footer from "@/components/common/footer";

interface ISidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen
}: ISidebarProps) {
  const [sidebarClose, setSidebarClose] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle sidebar close
  const handleCloseSidebar = () => {
    setSidebarClose(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
      setSidebarClose(false);
    }, 700);
  };

  // Handler sidebar close click on outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(e.target as Node)
      ) {
        handleCloseSidebar();
      }
    },
    [setIsSidebarOpen]
  );

  // Effect for sidebar click outside
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen, handleClickOutside]);

  // Sidebar open animation
  useGSAP(() => {
    if (isSidebarOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.in"
      });
      gsap.to(sidebarRef.current, {
        left: "0px",
        duration: 0.5,
        ease: "power4"
      });
    }
  }, [isSidebarOpen]);

  // Sidebar close animation
  useGSAP(() => {
    if (sidebarClose) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
      });
      gsap.to(sidebarRef.current, {
        left: "-270px",
        duration: 0.5,
        ease: "power4"
      });
    }
  }, [sidebarClose]);

  return (
    isSidebarOpen && (
      <>
        <div
          ref={sidebarRef}
          className="absolute left-[-270px] top-0 z-30 flex size-full max-w-[270px] flex-col gap-y-6 bg-white p-4 shadow-md dark:bg-neutral-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Image
                className="size-[32px]"
                src="/logo-icon.svg"
                alt="logo"
                width={50}
                height={50}
              />

              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Code Converter
              </h1>
            </div>

            <button
              onClick={handleCloseSidebar}
              className="editor-header-button"
            >
              <X className="size-[20px]" />
            </button>
          </div>

          <Search />
          <Menu onCloseSidebarAction={() => handleCloseSidebar()} />
          <Footer />
        </div>

        <div
          ref={overlayRef}
          className="absolute left-0 top-0 z-20 size-full bg-black/40 opacity-0"
        />
      </>
    )
  );
}
