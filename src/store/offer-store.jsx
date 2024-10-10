import { create } from "zustand";

const useOfferStore = create((set) => ({
  currentOffer: 0,
  setCurrentOffer: (newVal) => set({ currentOffer: newVal }),
  addAssetUserId: 0,
  setAddAssetUserId: (newVal) => set({ addAssetUserId: newVal }),
  noOffer: 0,
  setNoOffer: (newVal) => set({ noOffer: newVal }),
}));

export default useOfferStore;
