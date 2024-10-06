import { create } from "zustand";

const useAssetStore = create((set) => ({
  currentAsset: 0,
  setCurrentAsset: (newVal) => set({ currentAsset: newVal }),
}));

export default useAssetStore;
