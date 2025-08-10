import { create } from "zustand";
import { TMessengerMessageRecord } from "./dbMessengerMessagesUtils";

type TState = TMessengerMessageRecord[] | undefined | null;

const useInitMessengerMessageRecordsStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useMessengerMessageRecordsStore = () => {
  const store = useInitMessengerMessageRecordsStore();

  return { ...store };
};
