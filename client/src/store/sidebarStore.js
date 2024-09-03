import { create } from "zustand";

const useSideBarStore = create((set) => ({
  open: false,
  toggleSidebar: () => set((state) => ({ open: !state.open }))

}));

export default useSideBarStore;