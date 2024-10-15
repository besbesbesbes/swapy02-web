import { create } from "zustand";

const useAssetStore = create((set) => ({
  currentAsset: 0,
  setCurrentAsset: (newVal) => set({ currentAsset: newVal }),
  currentUserForRate: 0,
  setCurrentUserForRate: (newVal) => set({ currentUserForRate: newVal }),
  currentAssetForRate: 0,
  setCurrentAssetForRate: (newVal) =>
    set({
      currentAssetForRate: newVal,
    }),
  files: [],
  setFiles: (newVal) => set({ files: newVal }),
}));

export default useAssetStore;
