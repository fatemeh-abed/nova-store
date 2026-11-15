'use client';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {Product} from '@/types/product.types';
import type {CartItem} from '@/types/cart.types';

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};
export const useCartStore = create<CartState>()(persist((set) => ({
  items: [], hasHydrated: false,
  setHasHydrated: (value) => set({hasHydrated: value}),
  addItem: (product) => set((state) => {
    const exists = state.items.some((item) => item.product.id === product.id);
    return {items: exists
      ? state.items.map((item) => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      : [...state.items, {product, quantity: 1}]};
  }),
  removeItem: (id) => set((state) => ({items: state.items.filter((item) => item.product.id !== id)})),
  setQuantity: (id, quantity) => set((state) => ({items: state.items.map((item) =>
    item.product.id === id ? {...item, quantity: Math.max(1, Math.floor(Number.isFinite(quantity) ? quantity : 1))} : item)})),
  clearCart: () => set({items: []})
}), {
  name: 'nova-cart', storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({items: state.items}),
  onRehydrateStorage: () => (state) => state?.setHasHydrated(true)
}));
