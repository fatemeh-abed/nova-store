import type { CartItem } from '@/types/cart.types';
export function getCartTotals(items: readonly CartItem[]) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { itemCount, subtotal, total: subtotal };
}
