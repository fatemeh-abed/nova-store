import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

  const languages = {
    fa: `${siteUrl}/fa`,
    en: `${siteUrl}/en`,
  };

  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    alternates: {
      languages,
    },
  }));
}
