import { create } from 'zustand';

interface CartState {
  items: Record<string, number>;
  incrementItem: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: {},
  incrementItem: (id) => set((state) => ({
    items: { ...state.items, [id]: (state.items[id] || 0) + 1 }
  })),
}));