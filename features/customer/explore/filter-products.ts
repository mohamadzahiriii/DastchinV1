import { products } from '@/data/products';
import { getStore } from '@/data/lookup';
import { discountPercent } from '@/lib/format';
import type { CategoryId, Fulfillment, Product } from '@/types';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'discount' | 'newest' | 'remaining';

export type ExploreFilters = {
  query: string;
  category: CategoryId | 'all';
  fulfillment: Fulfillment | 'all';
  maxPrice: number;
  minDiscount: number;
  storeId: string | 'all';
  sort: SortKey;
};

export const defaultFilters: ExploreFilters = {
  query: '',
  category: 'all',
  fulfillment: 'all',
  maxPrice: 0,
  minDiscount: 0,
  storeId: 'all',
  sort: 'recommended',
};

export function filterProducts(filters: ExploreFilters): Product[] {
  const q = filters.query.trim().toLowerCase();

  const matched = products.filter((product) => {
    if (filters.category !== 'all' && product.categoryId !== filters.category) return false;
    if (filters.storeId !== 'all' && product.storeId !== filters.storeId) return false;
    if (filters.fulfillment !== 'all' && !product.fulfillment.includes(filters.fulfillment)) return false;
    if (filters.maxPrice > 0 && product.price > filters.maxPrice) return false;
    if (filters.minDiscount > 0 && discountPercent(product.originalPrice, product.price) < filters.minDiscount) return false;
    if (q) {
      const store = getStore(product.storeId);
      const haystack = `${product.name} ${product.description} ${store?.name ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return [...matched].sort((a, b) => {
    switch (filters.sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'discount':
        return discountPercent(b.originalPrice, b.price) - discountPercent(a.originalPrice, a.price);
      case 'newest':
        return b.createdAt.localeCompare(a.createdAt);
      case 'remaining':
        return a.remaining - b.remaining;
      default:
        return 0;
    }
  });
}
