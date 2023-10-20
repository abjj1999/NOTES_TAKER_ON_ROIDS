import { create } from "zustand";

type SettingState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
//   toggle: () => void;
};

export const useSetting = create<SettingState>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
//   toggle: () => set({ isOpen: !get().isOpen }),
}));