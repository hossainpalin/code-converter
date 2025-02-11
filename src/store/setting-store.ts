import { create } from "zustand";

interface State {
  isSettingsModalOpen: boolean;
}

interface Actions {
  setIsSettingsModalOpen: (isOpen: boolean) => void;
}

export const useSettingStore = create<State & Actions>((set) => ({
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen })
}));
