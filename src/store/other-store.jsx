import { create } from "zustand";

const useOtherStore = create((set) => ({
  message: "",
  setMessage: (newVal) => set({ message: newVal }),
}));

export default useOtherStore;
