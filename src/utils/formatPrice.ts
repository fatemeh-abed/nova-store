export function formatPrice(amount: number, locale: 'fa' | 'en', currency: 'USD' = 'USD'): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    style: 'currency', currency, maximumFractionDigits: 2
  }).format(amount);
}
// FakeStoreAPI returns USD amounts. Never label these values as toman without a conversion source.
