"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/common/sidebar";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex w-full items-center justify-between bg-indigo-600 px-4 py-2">
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="cursor-pointer rounded-lg bg-indigo-500/60 p-1.5 text-neutral-100 hover:bg-indigo-500"
          >
            <Menu className="size-[22px]" />
          </button>
          <h1 className="text-xl font-semibold text-neutral-100">
            Code Converter
          </h1>
        </div>

        <div className="flex items-center gap-x-2">
          <button
            data-tooltip-id="theme-tooltip"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-lg bg-indigo-500/60 p-1.5 text-neutral-100 hover:bg-indigo-500"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </button>

          <Link
            data-tooltip-id="github-tooltip"
            className="rounded-lg bg-indigo-500/60 p-1.5 hover:bg-indigo-500"
            href="https://github.com/hossainpalin/code-converter"
          >
            <Image
              className="size-[18px]"
              src="/github.svg"
              alt="github"
              width={32}
              height={32}
            />
          </Link>

          <Tooltip
            className=""
            id="theme-tooltip"
            place="bottom"
            content={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          />

          <Tooltip
            className=""
            id="github-tooltip"
            place="bottom"
            content="GitHub"
          />
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}
