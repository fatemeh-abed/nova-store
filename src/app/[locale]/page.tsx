import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';

import LandingPage from '@/components/home/LandingPage';

import { getProducts, getCategories } from '@/requests/productRequests';

import type { Product, Category } from '@/types/product.types';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  let products: Product[] = [];
  let categories: Category[] = [];
  let initialError = false;

  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    initialError = true;
  }

  return (
    <Suspense fallback={null}>
      <LandingPage
        initialProducts={products}
        initialCategories={categories}
        initialError={initialError}
      />
    </Suspense>
  );
}
