import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import StyledComponentsRegistry from '@/shared/StyledComponentsRegistry';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Vazirmatn, Inter } from 'next/font/google';
import '../globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-persian',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-english',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: 'metadata',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const title = t('title');
  const description = t('description');

  const canonicalPath = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      canonical: canonicalPath,
      languages: {
        fa: '/fa',
        en: '/en',
        'x-default': '/fa',
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: 'NOVA Store',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      alternateLocale: [locale === 'fa' ? 'en_US' : 'fa_IR'],
      type: 'website',
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${vazirmatn.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <ThemeProvider>
              <Suspense fallback={null}>
                <Header />
              </Suspense>

              {children}

              <Footer />
            </ThemeProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
