import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
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
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  // Handler sidebar close click on outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    },
    [setIsSidebarOpen]
  );

  // Sidebar animation
  useGSAP(() => {
    if (isSidebarOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        display: "block",
        duration: 0.5,
        ease: "power1.in"
      });
      gsap.to(sidebarRef.current, {
        left: "0px",
        duration: 0.5,
        ease: "power4"
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power1.out"
      });
      gsap.to(sidebarRef.current, {
        left: "-270px",
        duration: 0.5,
        ease: "power4"
      });
    }
  }, [isSidebarOpen]);

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

  return (
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
            onClick={() => setIsSidebarOpen(false)}
            className="editor-header-button"
          >
            <X className="size-[20px]" />
          </button>
        </div>

        <Search />
        <Menu onCloseAction={setIsSidebarOpen} />
        <Footer />
      </div>

      <div
        ref={overlayRef}
        className="absolute left-0 top-0 z-20 hidden size-full bg-black/40"
      ></div>
    </>
  );
}
