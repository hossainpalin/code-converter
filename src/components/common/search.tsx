import { SearchIcon } from "lucide-react";
import { useSearchStore } from "@/store/search-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function Search() {
  const { searchInputBox, setSearchInputBox, setSearchTerm } = useSearchStore(
    (state) => state
  );

  const debouncedValue = useDebounce(searchInputBox, 500);

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="flex w-full items-center">
      <SearchIcon className="absolute ml-2 size-[18px] text-gray-500" />

      <input
        className="w-full rounded-lg border border-gray-500 bg-white p-1 pl-8 text-gray-700 outline-none focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200"
        type="text"
        placeholder="Search"
        value={searchInputBox}
        onChange={(e) => setSearchInputBox(e.target.value)}
      />
    </div>
  );
}
