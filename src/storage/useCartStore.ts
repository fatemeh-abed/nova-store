'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Product } from '@/types/product.types';
import type { CartItem } from '@/types/cart.types';

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;

  setHasHydrated: (value: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const normalizeQuantity = (quantity: number): number => {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
};

const isValidProduct = (value: unknown): value is Product => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === 'number' &&
    Number.isInteger(product.id) &&
    product.id > 0 &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    typeof product.image === 'string'
  );
};

const sanitizeCartItems = (value: unknown): CartItem[] => {
  if (!Array.isArray(value)) return [];

  const uniqueItems = new Map<number, CartItem>();

  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) {
      continue;
    }

    const item = entry as Record<string, unknown>;

    if (!isValidProduct(item.product)) {
      continue;
    }

    const quantity = typeof item.quantity === 'number' ? normalizeQuantity(item.quantity) : 1;

    uniqueItems.set(item.product.id, {
      product: item.product,
      quantity,
    });
  }

  return Array.from(uniqueItems.values());
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.product.id === product.id);

          if (exists) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: normalizeQuantity(item.quantity + 1),
                    }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === id
              ? {
                  ...item,
                  quantity: normalizeQuantity(quantity),
                }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'nova-cart',

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        items: state.items,
      }),

      merge: (persistedState, currentState) => {
        const persisted = persistedState as { items?: unknown } | null;

        return {
          ...currentState,
          items: sanitizeCartItems(persisted?.items),
        };
      },

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Cart hydration failed:', error);
        }

        state?.setHasHydrated(true);
      },
    },
  ),
);
