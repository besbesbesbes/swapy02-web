import { create } from "zustand";

const userOtherStore = create((set) => ({
  message: "",
  setMessage: (newVal) => set({ message: newVal }),
}));

export default userOtherStore;
