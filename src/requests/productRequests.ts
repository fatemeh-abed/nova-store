import { axiosInstance } from '@/api/axiosInstance';
import type { Category, Product } from '@/types/product.types';

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await axiosInstance.get<Product[]>('/products', { signal });
  return data;
}
export async function getProductById(id: number, signal?: AbortSignal): Promise<Product> {
  if (!Number.isInteger(id) || id <= 0)
    throw new RangeError('Product ID must be a positive integer');
  const { data } = await axiosInstance.get<Product>(`/products/${id}`, { signal });
  return data;
}
export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const { data } = await axiosInstance.get<Category[]>('/products/categories', { signal });
  return data;
}
