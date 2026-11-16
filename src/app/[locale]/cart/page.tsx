import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import CartView from '@/components/cart/CartView';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: 'cart',
  });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),

    alternates: {
      canonical: `/${locale}/cart`,
      languages: {},
    },

    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <CartView />;
}
