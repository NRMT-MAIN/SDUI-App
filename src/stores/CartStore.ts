import { create } from 'zustand';

interface CartState {
  items: Record<string, number>;
  appliedCoupons: string[];
  activeCollectionId: string | null;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  applyCoupon: (couponCode: string) => boolean;
  setActiveCollection: (collectionId: string | null) => void;
}

/**
 * Cart Store using Zustand
 * Manages shopping cart state with local collocation
 * Prevents unnecessary global re-renders of unrelated components
 */
export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  appliedCoupons: [],
  activeCollectionId: null,

  incrementItem: (id: string) => {
    if (!id) {
      console.warn('[CartStore] Cannot increment item: missing ID');
      return;
    }
    set((state) => ({
      items: {
        ...state.items,
        [id]: (state.items[id] || 0) + 1,
      },
    }));
  },

  decrementItem: (id: string) => {
    if (!id) {
      console.warn('[CartStore] Cannot decrement item: missing ID');
      return;
    }
    set((state) => {
      const currentQuantity = state.items[id] || 0;
      if (currentQuantity <= 0) {
        return state;
      }
      return {
        items: {
          ...state.items,
          [id]: currentQuantity - 1,
        },
      };
    });
  },

  removeItem: (id: string) => {
    if (!id) {
      console.warn('[CartStore] Cannot remove item: missing ID');
      return;
    }
    set((state) => {
      const { [id]: removed, ...rest } = state.items;
      return { items: rest };
    });
  },

  clearCart: () => {
    set({ items: {} });
  },

  applyCoupon: (couponCode: string) => {
    if (!couponCode) {
      console.warn('[CartStore] Cannot apply coupon: missing code');
      return false;
    }

    const normalizedCode = couponCode.trim().toUpperCase();
    const state = get();

    if (state.appliedCoupons.includes(normalizedCode)) {
      return false;
    }

    set((currentState) => ({
      appliedCoupons: [...currentState.appliedCoupons, normalizedCode],
    }));

    return true;
  },

  setActiveCollection: (collectionId: string | null) => {
    set({ activeCollectionId: collectionId });
  },

  getCartTotal: () => {
    const state = get();
    return Object.values(state.items).reduce((sum, qty) => sum + qty, 0);
  },
}));