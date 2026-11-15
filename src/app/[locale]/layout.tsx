import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import StyledComponentsRegistry from '@/shared/StyledComponentsRegistry';
import {ThemeProvider} from '@/context/ThemeContext';
import '../globals.css';

type Props = {children: React.ReactNode; params: Promise<{locale: string}>};
export function generateStaticParams() {return routing.locales.map((locale) => ({locale}));}
export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: 'metadata'});
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return {metadataBase: new URL(base), title: t('title'), description: t('description'),
    alternates: {canonical: `/${locale}`, languages: {fa: '/fa', en: '/en'}},
    openGraph: {title: t('title'), description: t('description'), locale, type: 'website'}};
}
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
    <body><NextIntlClientProvider messages={messages}>
      <StyledComponentsRegistry><ThemeProvider>{children}</ThemeProvider></StyledComponentsRegistry>
    </NextIntlClientProvider></body>
  </html>;
}
