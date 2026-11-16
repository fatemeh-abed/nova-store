const productTranslations: Record<number, string> = {
  1: 'کوله‌پشتی روزمره مردانه',
  2: 'تی‌شرت مردانه اسپرت',
  3: 'کت مردانه نخی',
  4: 'پیراهن مردانه',
  5: 'دستبند زنانه نقره‌ای',
  6: 'انگشتر زنانه',
  7: 'انگشتر نگین‌دار',
  8: 'گوشواره زنانه',
  9: 'هارد اکسترنال قابل حمل',
  10: 'حافظه SSD اکسترنال',
  11: 'حافظه ذخیره‌سازی',
  12: 'هارد اکسترنال گیمینگ',
  13: 'مانیتور گیمینگ',
  14: 'مانیتور Full HD',
  15: 'کاپشن زنانه',
  16: 'کت زنانه',
  17: 'کاپشن بارانی زنانه',
  18: 'بلوز زنانه',
  19: 'تی‌شرت زنانه',
  20: 'تی‌شرت زنانه اسپرت',
};

export function getProductTitle(id: number, originalTitle: string, locale: string): string {
  if (locale !== 'fa') return originalTitle;

  return productTranslations[id] ?? originalTitle;
}

const categoryTranslations: Record<string, string> = {
  electronics: 'دیجیتال',
  jewelery: 'زیورآلات',
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
};

export function getCategoryTitle(category: string, locale: string): string {
  if (locale !== 'fa') return category;

  return categoryTranslations[category] ?? category;
}
