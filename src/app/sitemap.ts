import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return routing.locales.flatMap((locale) => [
    {url: `${site}/${locale}`, alternates: {languages: {fa: `${site}/fa`, en: `${site}/en`}}},
    {url: `${site}/${locale}/cart`, alternates: {languages: {fa: `${site}/fa/cart`, en: `${site}/en/cart`}}}
  ]);
}
