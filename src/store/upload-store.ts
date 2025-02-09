import { create } from "zustand";

interface State {
  uploadedFile: string;
  fetchedFile: string;
  isUploadModalOpen: boolean;
}

interface Actions {
  setUploadedFile: (uploadFile: string) => void;
  setFetchedFile: (fetchFile: string) => void;
  setIsUploadModalOpen: (isOpen: boolean) => void;
}

export const useUploadStore = create<State & Actions>((set) => ({
  uploadedFile: "",
  fetchedFile: "",
  isUploadModalOpen: false,
  setIsUploadModalOpen: (isOpen) => set({ isUploadModalOpen: isOpen }),
  setUploadedFile: (uploadedFile) => set({ uploadedFile }),
  setFetchedFile: (fetchedFile) => set({ fetchedFile })
}));
