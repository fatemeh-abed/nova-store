'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { ProductSort } from '@/types/enums/ProductSort';
import type { Product } from '@/types/product.types';
import { selectProducts } from '@/utils/productCatalog';
import type { SupportedLocale } from '@/utils/formatPrice';

export function useProductCatalog(products: readonly Product[], initialSearch = '') {
  const currentLocale = useLocale();
  const searchParams = useSearchParams();

  const locale: SupportedLocale = currentLocale === 'fa' ? 'fa' : 'en';

  const urlSearch = searchParams.get('q') ?? initialSearch;

  const [searchOverride, setSearchOverride] = useState<{
    urlSearch: string;
    value: string;
  } | null>(null);

  const search = searchOverride?.urlSearch === urlSearch ? searchOverride.value : urlSearch;

  const [category, setCategoryState] = useState<string | null>(null);
  const [sort, setSortState] = useState<ProductSort>(ProductSort.TitleAsc);
  const [page, setPage] = useState(1);

  const result = useMemo(
    () =>
      selectProducts(products, {
        search,
        category,
        sort,
        page,
        pageSize: 6,
        locale,
      }),
    [products, search, category, sort, page, locale],
  );

  const setSearch = (value: string) => {
    setSearchOverride({ urlSearch, value });
    setPage(1);
  };

  const setCategory = (value: string | null) => {
    setCategoryState(value);
    setPage(1);
  };

  const setSort = (value: ProductSort) => {
    setSortState(value);
    setPage(1);
  };

  return {
    search,
    category,
    sort,
    page,
    result,
    setPage,
    setSearch,
    setCategory,
    setSort,
  };
}
