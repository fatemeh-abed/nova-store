'use client';
import { useCartStore } from './useCartStore';

export function useCartHydrated(): boolean {
  return useCartStore((state) => state.hasHydrated);
}
