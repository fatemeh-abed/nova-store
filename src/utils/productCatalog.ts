import type { Product } from '@/types/product.types';
import { ProductSort } from '@/types/enums/ProductSort';
import { getProductTitle } from '@/utils/productTranslations';
import type { SupportedLocale } from '@/utils/formatPrice';

export interface CatalogOptions {
  search?: string;
  category?: string | null;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
  locale?: SupportedLocale;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

function normalizeSearch(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function selectProducts(
  products: readonly Product[],
  options: CatalogOptions = {},
): PaginatedProducts {
  const {
    search = '',
    category = null,
    sort = ProductSort.TitleAsc,
    page = 1,
    pageSize = 6,
    locale = 'en',
  } = options;

  const query = normalizeSearch(search);

  const collator = new Intl.Collator(locale === 'fa' ? 'fa-IR' : 'en-US', {
    sensitivity: 'base',
    numeric: true,
  });

  const filtered = products.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }

    if (!query) return true;

    const localizedTitle = getProductTitle(product.id, product.title, locale);

    const searchableText = normalizeSearch(
      [localizedTitle, product.title, product.description, product.category].join(' '),
    );

    return searchableText.includes(query);
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case ProductSort.PriceAsc:
        return a.price - b.price;

      case ProductSort.PriceDesc:
        return b.price - a.price;

      case ProductSort.TitleDesc: {
        const titleA = getProductTitle(a.id, a.title, locale);
        const titleB = getProductTitle(b.id, b.title, locale);

        return collator.compare(titleB, titleA);
      }

      case ProductSort.TitleAsc:
      default: {
        const titleA = getProductTitle(a.id, a.title, locale);
        const titleB = getProductTitle(b.id, b.title, locale);

        return collator.compare(titleA, titleB);
      }
    }
  });

  const safeSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 6;

  const totalPages = Math.max(1, Math.ceil(sorted.length / safeSize));

  const safePage = Math.min(Math.max(Number.isInteger(page) ? page : 1, 1), totalPages);

  return {
    items: sorted.slice((safePage - 1) * safeSize, safePage * safeSize),
    total: sorted.length,
    page: safePage,
    totalPages,
  };
}
