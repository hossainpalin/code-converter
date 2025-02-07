import { create } from "zustand";

interface State {
  sourceCode: string;
}

interface Actions {
  setSourceCode: (sourceCode: string) => void;
}

export const useEditorStore = create<State & Actions>((set) => ({
  sourceCode: "",
  setSourceCode: (sourceCode) => set({ sourceCode })
}));
