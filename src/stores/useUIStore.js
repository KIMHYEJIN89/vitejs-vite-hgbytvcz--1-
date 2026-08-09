import { create } from 'zustand';

const useUIStore = create((set) => ({
  sheetHeight: 0,
  setSheetHeight: (height) => set({ sheetHeight: height }),

  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),

  searchCount: 0,
  setSearchCount: (count) => set({ searchCount: count }),
}));

export default useUIStore;
