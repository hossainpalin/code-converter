"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/store/search-store";

interface IMenuProps {
  onCloseSidebarAction: () => void;
}

export default function Menu({ onCloseSidebarAction }: IMenuProps) {
  const { searchTerm, setSearchTerm, setSearchInputBox } = useSearchStore(
    (state) => state
  );
  const pathname = usePathname();

  // All routes
  const routes = useMemo(() => {
    return [
      {
        id: 1,
        name: "SVG to JSX",
        href: "/",
        isActive: pathname === "/"
      },
      {
        id: 2,
        name: "SVG to React Native",
        href: "/svg-to-react-native",
        isActive: pathname === "/svg-to-react-native"
      },
      {
        id: 3,
        name: "HTML to JSX",
        href: "/html-to-jsx",
        isActive: pathname === "/html-to-jsx"
      },
      {
        id: 4,
        name: "HTML to Pug",
        href: "/html-to-pug",
        isActive: pathname === "/html-to-pug"
      }
    ];
  }, [pathname]);

  // Searched routes
  const searchedRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchTerm)
  );

  return (
    <ul className="flex size-full flex-col items-start justify-start gap-y-2 overflow-y-auto text-[14px] font-light text-gray-700">
      {searchedRoutes.length > 0 ? (
        searchedRoutes.map(({ id, name, href, isActive }) => (
          <li
            onClick={() => {
              onCloseSidebarAction();
              setSearchTerm("");
              setSearchInputBox("");
            }}
            key={id}
            className="relative w-full"
          >
            <Link
              className={cn(
                "block w-full rounded-md p-1 pl-3 font-normal transition-colors hover:bg-neutral-200 hover:text-gray-800 text-gray-600 dark:text-gray-300 dark:hover:bg-neutral-700 dark:hover:text-gray-300",
                isActive && " bg-neutral-200 dark:bg-neutral-700 text-gray-800"
              )}
              href={href}
            >
              {name}
            </Link>

            {isActive && (
              <span className="absolute left-0 top-1 inline-block h-5 rounded-full border-l-[3px] border-gray-600 dark:border-white"></span>
            )}
          </li>
        ))
      ) : (
        <li className="w-full text-center text-gray-600 dark:text-gray-300">
          Not found
        </li>
      )}
    </ul>
  );
}
