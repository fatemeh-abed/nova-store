'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';

import { useCartStore } from '@/storage/useCartStore';
import { useCartHydrated } from '@/storage/useCartHydrated';

import { getCartTotals } from '@/utils/cartTotals';

import Spinner from '@/shared/Spinner';

import CartHeader from './CartHeader';
import CartItemsList from './CartItemsList';
import CartSummary from './CartSummary';
import CartEmptyState from './CartEmptyState';

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.tokens.sizes.content};

  margin: 0 auto;
  min-height: 55vh;

  padding: 40px 20px 70px;

  @media (max-width: 767px) {
    padding: 24px 16px 50px;
  }
`;

const CartLayout = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 2fr)
    minmax(280px, 1fr);

  gap: ${({ theme }) => theme.tokens.spacing.lg};

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProductsSection = styled.section`
  min-width: 0;
`;

const SummarySection = styled.div`
  min-width: 0;

  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 300px;
`;

export default function CartView() {
  const t = useTranslations('cart');

  const hydrated = useCartHydrated();

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);

  const { itemCount } = getCartTotals(items);

  if (!hydrated) {
    return (
      <Main>
        <LoadingWrapper>
          <Spinner label={t('loading')} />
        </LoadingWrapper>
      </Main>
    );
  }

  return (
    <Main>
      <CartHeader itemCount={itemCount} />

      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <CartLayout>
          <ProductsSection>
            <CartItemsList items={items} />
          </ProductsSection>

          <SummarySection>
            <CartSummary items={items} onClearCart={clearCart} />
          </SummarySection>
        </CartLayout>
      )}
    </Main>
  );
}
