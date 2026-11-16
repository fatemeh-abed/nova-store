'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';

import type { Product } from '@/types/product.types';
import { ProductSort } from '@/types/enums/ProductSort';

import ProductCard from './ProductCard';
import ProductSortSelect from './ProductSortSelect';

import Pagination from '@/shared/Pagination';
import Spinner from '@/shared/Spinner';
import EmptyState from '@/shared/EmptyState';
import ErrorState from '@/shared/ErrorState';

interface ProductSectionProps {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  sort: ProductSort;
  loading: boolean;
  error: boolean;
  onSortChange: (sort: ProductSort) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

const Section = styled.section``;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  margin-bottom: 18px;
  min-width: 0;

  h2 {
    font-size: clamp(20px, 2.3vw, 27px);
    margin: 0;
  }

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  min-width: 0;

  /* Large mobile */
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  /* Tablet */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
`;

const LoadingContainer = styled.div`
  padding: 60px;
  text-align: center;
`;

const PaginationContainer = styled.div`
  margin-top: 24px;
`;

export default function ProductSection({
  products,
  total,
  page,
  totalPages,
  sort,
  loading,
  error,
  onSortChange,
  onPageChange,
  onRetry,
}: ProductSectionProps) {
  const t = useTranslations('landing');

  return (
    <Section id="products" aria-labelledby="products-title">
      <Top>
        <h2 id="products-title">{t('featured')}</h2>

        <ProductSortSelect value={sort} onChange={onSortChange} />
      </Top>

      {loading ? (
        <LoadingContainer aria-live="polite">
          <Spinner label={t('loading')} />
        </LoadingContainer>
      ) : error ? (
        <ErrorState message={t('error')} retryLabel={t('retry')} onRetry={onRetry} />
      ) : total === 0 ? (
        <EmptyState title={t('empty')} description="" />
      ) : (
        <>
          <Grid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>

          <PaginationContainer>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={onPageChange}
              label={t('page')}
              previousLabel={t('previous')}
              nextLabel={t('next')}
            />
          </PaginationContainer>
        </>
      )}
    </Section>
  );
}
