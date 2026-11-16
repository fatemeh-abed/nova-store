'use client';

import styled from 'styled-components';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { routes } from '@/utils/routes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 380px;
  padding: 60px 20px;

  text-align: center;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.lg};
`;

const IconBox = styled.div`
  display: grid;
  place-items: center;

  width: 100px;
  height: 100px;

  margin-bottom: 24px;

  background: ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.tokens.colors.orange};

  border-radius: 50%;
`;

const Title = styled.h2`
  margin: 0 0 12px;

  font-size: 22px;
  font-weight: 800;

  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0 0 28px;

  max-width: 420px;
  line-height: 1.9;
  font-size: 14px;

  color: ${({ theme }) => theme.colors.secondary};
`;

const ShoppingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 46px;
  padding: 12px 24px;

  background: ${({ theme }) => theme.tokens.colors.orange};
  color: #ffffff;

  border-radius: ${({ theme }) => theme.tokens.radii.md};

  text-decoration: none;
  font-size: 14px;
  font-weight: 700;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export default function CartEmptyState() {
  const t = useTranslations('cart');
  const locale = useLocale();

  return (
    <Wrapper>
      <IconBox>
        <ShoppingBag size={46} strokeWidth={1.5} />
      </IconBox>

      <Title>{t('emptyTitle')}</Title>

      <Description>{t('emptyDescription')}</Description>

      <ShoppingLink href={routes.home}>
        {t('continueShopping')}

        {locale === 'fa' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
      </ShoppingLink>
    </Wrapper>
  );
}
