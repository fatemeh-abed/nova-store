'use client';

import styled from 'styled-components';

import { useProductCatalog } from '@/hooks/useProductCatalog';
import { useHomeProducts } from '@/hooks/useHomeProducts';

import type { Product, Category } from '@/types/product.types';

import HeroSection from './HeroSection';
import NewsletterSection from './NewsletterSection';
import CategorySection from './CategorySection';
import ProductSection from './ProductSection';

interface LandingPageProps {
  initialProducts: Product[];
  initialCategories: Category[];
  initialError: boolean;
}

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.tokens.sizes.content};
  margin-inline: auto;
  padding-inline: 16px;
  min-width: 0;

  @media (min-width: 768px) {
    padding-inline: 20px;
  }

  @media (min-width: 1024px) {
    padding-inline: 24px;
  }
`;

export default function LandingPage({
  initialProducts,
  initialCategories,
  initialError,
}: LandingPageProps) {
  const { products, categories, loading, error, retry } = useHomeProducts({
    initialProducts,
    initialCategories,
    initialError,
  });

  const {
    category,
    sort,
    result: data,
    setCategory,
    setSort,
    setPage,
  } = useProductCatalog(products);

  return (
    <Main>
      <HeroSection />

      <CategorySection categories={categories} selectedCategory={category} onSelect={setCategory} />

      <ProductSection
        products={data.items}
        total={data.total}
        page={data.page}
        totalPages={data.totalPages}
        sort={sort}
        loading={loading}
        error={error}
        onSortChange={setSort}
        onPageChange={setPage}
        onRetry={retry}
      />

      <NewsletterSection />
    </Main>
  );
}
