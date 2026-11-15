'use client';
import {useCartStore} from './useCartStore';
/** Delay cart-dependent UI until persisted browser state has hydrated. */
export function useCartHydrated(): boolean {
  return useCartStore((state) => state.hasHydrated);
}
