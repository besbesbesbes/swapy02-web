import { create } from "zustand";

const useOfferStore = create((set) => ({
  currentOffer: 0,
  setCurrentOffer: (newVal) => set({ currentOffer: newVal }),
  addAssetUserId: 0,
  setAddAssetUserId: (newVal) => set({ addAssetUserId: newVal }),
}));

export default useOfferStore;
