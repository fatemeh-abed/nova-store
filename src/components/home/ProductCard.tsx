'use client';

import styled from 'styled-components';
import { ShoppingCart, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import type { Product } from '@/types/product.types';
import { useCartStore } from '@/storage/useCartStore';

import { formatPrice, formatNumber, type SupportedLocale } from '@/utils/formatPrice';

import { getProductTitle, getCategoryTitle } from '@/utils/productTranslations';

interface ProductCardProps {
  product: Product;
}

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  min-width: 0;

  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }
`;

const Picture = styled.div`
  position: relative;
  height: 205px;
  background: #f1f2f5;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 12px;
    mix-blend-mode: multiply;
  }

  @media (max-width: 600px) {
    height: 155px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
  padding: 10px 12px 12px;
  text-align: start;
`;

const Category = styled.span`
  align-self: flex-start;
  background: #eaf5ff;
  color: #2672a8;
  border-radius: 100px;
  padding: 4px 9px;
  font-size: 10px;
  font-weight: 600;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
`;

const RatingCount = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Price = styled.strong`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const AddButton = styled.button`
  margin-top: auto;
  min-height: 36px;
  width: 100%;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  background: ${({ theme }) => theme.tokens.colors.orange};
  color: #fff;
  border: none;
  border-radius: 7px;

  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(0.94);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 2px;
  }
`;

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('landing');
  const currentLocale = useLocale();

  const locale: SupportedLocale = currentLocale === 'fa' ? 'fa' : 'en';

  const addItem = useCartStore((state) => state.addItem);

  const productTitle = getProductTitle(product.id, product.title, locale);

  const categoryTitle = getCategoryTitle(product.category, locale);

  const rating = formatNumber(product.rating.rate, locale, { maximumFractionDigits: 1 });

  const ratingCount = formatNumber(product.rating.count, locale);

  const price = formatPrice(product.price, locale);

  return (
    <Card>
      <Picture>
        <Image
          src={product.image}
          alt={t('imageAlt', { title: productTitle })}
          unoptimized
          width={225}
          height={225}
        />
      </Picture>

      <Content>
        <Category>{categoryTitle}</Category>

        <Title title={productTitle}>{productTitle}</Title>

        <Rating
          aria-label={t('rating', {
            rate: rating,
            count: ratingCount,
          })}
        >
          <Star size={13} fill="#f59e0b" color="#f59e0b" />

          <span>{rating}</span>

          <RatingCount>({ratingCount})</RatingCount>
        </Rating>

        <Price>{price}</Price>

        <AddButton type="button" onClick={() => addItem(product)}>
          <ShoppingCart size={15} />
          {t('addCart')}
        </AddButton>
      </Content>
    </Card>
  );
}
