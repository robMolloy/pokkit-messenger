import { create } from "zustand";

type TState = boolean;

export const useForceSidebarOpenStore = create<{
  data: TState;
  setData: (x: TState) => void;
}>()((set) => ({
  data: false,
  setData: (data) => set(() => ({ data })),
}));
