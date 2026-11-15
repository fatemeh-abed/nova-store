import type {CartItem} from '@/types/cart.types';
export function calculateCartTotals(items: readonly CartItem[]) {
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return {quantity, total};
}
