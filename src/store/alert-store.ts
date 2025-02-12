import { create } from "zustand";

interface State {
  isAlertModalOpen: boolean;
}

interface Actions {
  setIsAlertModalOpen: (isOpen: boolean) => void;
}

export const useAlertStore = create<State & Actions>((set) => ({
  isAlertModalOpen: false,
  setIsAlertModalOpen: (isOpen) => set({ isAlertModalOpen: isOpen })
}));
