export type SupportedLocale = 'fa' | 'en';

const USD_TO_TOMAN = 100_000;

export function formatNumber(
  value: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', options).format(value);
}

export function convertToToman(priceUSD: number): number {
  return Math.round(priceUSD * USD_TO_TOMAN);
}

export function formatPrice(priceUSD: number, locale: SupportedLocale): string {
  if (locale === 'fa') {
    const toman = convertToToman(priceUSD);

    return `${formatNumber(toman, 'fa')} تومان`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceUSD);
}
