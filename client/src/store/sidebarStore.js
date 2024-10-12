import { create } from "zustand";

const useSideBarStore = create((set) => ({
  open: true,
  toggleSidebar: () => set((state) => ({ open: !state.open }))

}));

export default useSideBarStore;