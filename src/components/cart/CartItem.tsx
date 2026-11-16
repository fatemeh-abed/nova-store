'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import type { CartItem as CartItemType } from '@/types/cart.types';
import { formatPrice, type SupportedLocale } from '@/utils/formatPrice';

import QuantityStepper from './QuantityStepper';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  title?: string;
}

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) 120px 160px;
  align-items: center;
  gap: 20px;

  padding: 20px 24px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.md};

  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 80px minmax(0, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
  }
`;

const ImageBox = styled.div`
  width: 90px;
  height: 100px;

  display: grid;
  place-items: center;

  background: ${({ theme }) => theme.colors.subtle};
  border-radius: ${({ theme }) => theme.tokens.radii.md};

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  @media (max-width: 900px) {
    width: 80px;
    height: 90px;
  }
`;

const ProductInfo = styled.div`
  min-width: 0;
`;

const ProductTitle = styled.h2`
  margin: 0 0 8px;

  font-size: 15px;
  font-weight: 700;
  line-height: 1.7;

  color: ${({ theme }) => theme.colors.text};
`;

const UnitPrice = styled.p`
  margin: 0;

  font-size: 12px;
  line-height: 1.8;

  color: ${({ theme }) => theme.colors.secondary};
`;

const QuantityBox = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    grid-column: 2;
    justify-content: flex-start;
  }
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  @media (max-width: 900px) {
    grid-column: 2;
    align-items: flex-start;
  }
`;

const LineTotal = styled.strong`
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors.text};
`;

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 6px 0;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.tokens.colors.danger};

  font-size: 12px;
  cursor: pointer;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

export default function CartItem({ item, onIncrease, onDecrease, onRemove, title }: CartItemProps) {
  const t = useTranslations('cart');
  const locale = useLocale() as SupportedLocale;

  const { product, quantity } = item;

  const productTitle = title ?? product.title;
  const lineTotal = product.price * quantity;

  return (
    <Wrapper>
      <ImageBox>
        <Image
          src={product.image}
          alt={t('imageAlt', { title: productTitle })}
          width={90}
          height={100}
          unoptimized
        />
      </ImageBox>

      <ProductInfo>
        <ProductTitle>{productTitle}</ProductTitle>

        <UnitPrice>
          {t('unitPrice')}: {formatPrice(product.price, locale)}
        </UnitPrice>
      </ProductInfo>

      <QuantityBox>
        <QuantityStepper
          quantity={quantity}
          productTitle={productTitle}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </QuantityBox>

      <PriceBox>
        <LineTotal>{formatPrice(lineTotal, locale)}</LineTotal>

        <RemoveButton
          type="button"
          onClick={onRemove}
          aria-label={t('remove', {
            title: productTitle,
          })}
        >
          <Trash2 size={15} />
          {t('removeButton')}
        </RemoveButton>
      </PriceBox>
    </Wrapper>
  );
}
