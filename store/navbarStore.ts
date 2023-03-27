import { create } from "zustand";

interface NavbarState {
  active: string;
  setActive: (section: string) => void;
}
export const useNavbarStore = create<NavbarState>()((set) => ({
  active: "ABOUT",
  setActive: (section) => set(() => ({ active: section })),
}));
