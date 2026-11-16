'use client';

import styled from 'styled-components';

import type { CartItem as CartItemType } from '@/types/cart.types';
import { useCartStore } from '@/storage/useCartStore';

import CartItem from './CartItem';

interface CartItemsListProps {
  items: CartItemType[];
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing.md};

  width: 100%;
  min-width: 0;
`;

export default function CartItemsList({ items }: CartItemsListProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <List>
      {items.map((item) => {
        const { product, quantity } = item;

        return (
          <CartItem
            key={product.id}
            item={item}
            onIncrease={() => setQuantity(product.id, quantity + 1)}
            onDecrease={() => setQuantity(product.id, quantity - 1)}
            onRemove={() => removeItem(product.id)}
          />
        );
      })}
    </List>
  );
}
