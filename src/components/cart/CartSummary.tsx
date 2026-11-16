'use client';

import styled from 'styled-components';
import { Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import type { CartItem } from '@/types/cart.types';

import { getCartTotals } from '@/utils/cartTotals';
import { formatPrice, formatNumber, type SupportedLocale } from '@/utils/formatPrice';

import Button from '@/shared/Button';

interface CartSummaryProps {
  items: CartItem[];
  onClearCart: () => void;
}

const Wrapper = styled.aside`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.lg};

  padding: 24px;
  width: 100%;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 18px;
  }
`;

const Title = styled.h2`
  margin: 0 0 24px;

  font-size: 18px;
  font-weight: 800;

  color: ${({ theme }) => theme.colors.text};
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 18px;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};

  span:last-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-align: end;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  margin: 24px 0;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 24px;

  color: ${({ theme }) => theme.colors.text};

  span {
    font-size: 15px;
    font-weight: 700;
  }

  strong {
    font-size: 18px;
    font-weight: 800;
    text-align: end;
  }
`;

const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 48px;
  padding: 12px 20px;

  background: ${({ theme }) => theme.tokens.colors.orange};
  color: #ffffff;

  border: none;
  border-radius: ${({ theme }) => theme.tokens.radii.md};

  font-size: 15px;
  font-weight: 700;

  cursor: not-allowed;
  opacity: 0.85;

  &:disabled {
    cursor: not-allowed;
  }
`;

const ClearButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 12px;
`;

const Notice = styled.p`
  margin: 16px 0 0;

  font-size: 12px;
  line-height: 1.8;
  text-align: center;

  color: ${({ theme }) => theme.colors.secondary};
`;

export default function CartSummary({ items, onClearCart }: CartSummaryProps) {
  const t = useTranslations('cart');
  const currentLocale = useLocale();
  const locale: SupportedLocale = currentLocale === 'fa' ? 'fa' : 'en';

  const totals = getCartTotals(items);

  return (
    <Wrapper>
      <Title>{t('summary')}</Title>

      <SummaryRow>
        <span>{t('itemCount')}</span>
        <span>{formatNumber(totals.itemCount, locale)}</span>
      </SummaryRow>

      <SummaryRow>
        <span>{t('subtotal')}</span>
        <span>{formatPrice(totals.subtotal, locale)}</span>
      </SummaryRow>

      <Divider />

      <TotalRow>
        <span>{t('total')}</span>
        <strong>{formatPrice(totals.total, locale)}</strong>
      </TotalRow>

      <CheckoutButton type="button" disabled aria-label={t('checkoutUnavailable')}>
        {t('checkout')}
      </CheckoutButton>

      <ClearButton fullWidth onClick={onClearCart}>
        <Trash2 size={17} />
        {t('clear')}
      </ClearButton>

      <Notice>{t('demoNotice')}</Notice>
    </Wrapper>
  );
}
