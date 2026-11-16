'use client';

import { useCallback, useEffect, useState } from 'react';

import { getProducts, getCategories } from '@/requests/productRequests';

import type { Product, Category } from '@/types/product.types';

interface HomeProductsState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: boolean;
}

interface UseHomeProductsOptions {
  initialProducts: Product[];
  initialCategories: Category[];
  initialError: boolean;
}

export function useHomeProducts({
  initialProducts,
  initialCategories,
  initialError,
}: UseHomeProductsOptions) {
  const [state, setState] = useState<HomeProductsState>({
    products: initialProducts,
    categories: initialCategories,
    loading: false,
    error: initialError,
  });

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (retryCount === 0) return;

    const controller = new AbortController();

    Promise.all([getProducts(controller.signal), getCategories(controller.signal)])
      .then(([products, categories]) => {
        if (controller.signal.aborted) return;

        setState({
          products,
          categories,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        setState((previous) => ({
          ...previous,
          loading: false,
          error: true,
        }));
      });

    return () => controller.abort();
  }, [retryCount]);

  const retry = useCallback(() => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: false,
    }));

    setRetryCount((count) => count + 1);
  }, []);

  return {
    ...state,
    retry,
  };
}
