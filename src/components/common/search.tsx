import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="flex w-full items-center">
      <SearchIcon className="absolute ml-2 size-[18px] text-gray-500" />

      <input
        className="w-full rounded-lg border border-gray-500 bg-white p-1 pl-8 text-gray-700 outline-none focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
