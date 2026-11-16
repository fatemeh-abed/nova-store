'use client';

import styled from 'styled-components';
import { Minus, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { formatNumber, type SupportedLocale } from '@/utils/formatPrice';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  productTitle: string;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  height: 38px;
  min-width: 108px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.md};

  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  overflow: hidden;
  direction: ltr;
`;

const ControlButton = styled.button`
  display: grid;
  place-items: center;

  width: 36px;
  height: 36px;

  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.subtle};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.tokens.colors.orange};
    outline-offset: -2px;
  }
`;

const Quantity = styled.span`
  min-width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

export default function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  productTitle,
  disabled = false,
}: QuantityStepperProps) {
  const t = useTranslations('cart');
  const locale = useLocale() as SupportedLocale;

  return (
    <Wrapper role="group" aria-label={t('quantity')}>
      <ControlButton
        type="button"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label={t('decrease', {
          title: productTitle,
        })}
      >
        <Minus size={16} />
      </ControlButton>

      <Quantity aria-live="polite">{formatNumber(quantity, locale)}</Quantity>

      <ControlButton
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        aria-label={t('increase', {
          title: productTitle,
        })}
      >
        <Plus size={16} />
      </ControlButton>
    </Wrapper>
  );
}
