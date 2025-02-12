import { create } from "zustand";

interface State {
  searchTerm: string;
  searchInputBox: string;
}

interface Actions {
  setSearchTerm: (searchTerm: string) => void;
  setSearchInputBox: (searchInputBox: string) => void;
}

export const useSearchStore = create<State & Actions>((set) => ({
  searchTerm: "",
  searchInputBox: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSearchInputBox: (searchInputBox) => set({ searchInputBox })
}));
