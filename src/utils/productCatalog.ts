import type {Product} from '@/types/product.types';
import {ProductSort} from '@/types/enums/ProductSort';

export interface CatalogOptions { search?: string; category?: string | null; sort?: ProductSort; page?: number; pageSize?: number }
export interface PaginatedProducts { items: Product[]; total: number; page: number; totalPages: number }
export function selectProducts(products: readonly Product[], options: CatalogOptions = {}): PaginatedProducts {
  const {search = '', category, sort = ProductSort.TitleAsc, page = 1, pageSize = 6} = options;
  const query = search.trim().toLocaleLowerCase();
  const filtered = products.filter((product) =>
    (!category || product.category === category) &&
    (!query || `${product.title} ${product.description} ${product.category}`.toLocaleLowerCase().includes(query))
  );
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case ProductSort.PriceAsc: return a.price - b.price;
      case ProductSort.PriceDesc: return b.price - a.price;
      case ProductSort.TitleDesc: return b.title.localeCompare(a.title);
      default: return a.title.localeCompare(b.title);
    }
  });
  const safeSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 6;
  const totalPages = Math.max(1, Math.ceil(sorted.length / safeSize));
  const safePage = Math.min(Math.max(Number.isInteger(page) ? page : 1, 1), totalPages);
  return {items: sorted.slice((safePage - 1) * safeSize, safePage * safeSize), total: sorted.length, page: safePage, totalPages};
}
