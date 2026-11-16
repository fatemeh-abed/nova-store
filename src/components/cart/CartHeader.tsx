'use client';

import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { formatNumber, type SupportedLocale } from '@/utils/formatPrice';

interface CartHeaderProps {
  itemCount: number;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 28px;

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #14243b;
  flex-shrink: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Count = styled.span`
  padding: 7px 14px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.pill};

  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.secondary};

  font-size: 13px;
  font-weight: 600;
`;

export default function CartHeader({ itemCount }: CartHeaderProps) {
  const t = useTranslations('cart');
  const locale = useLocale() as SupportedLocale;

  return (
    <Wrapper>
      <Heading>
        <IconBox>
          <ShoppingCart size={26} strokeWidth={2.5} />
        </IconBox>

        <Title>{t('title')}</Title>
      </Heading>

      <Count>
        {t('itemCount')}: {formatNumber(itemCount, locale)}
      </Count>
    </Wrapper>
  );
}
