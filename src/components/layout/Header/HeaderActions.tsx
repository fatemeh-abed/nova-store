'use client';

import { ShoppingCart, Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

import { useTheme } from '@/context/ThemeContext';
import { useCartStore } from '@/storage/useCartStore';
import { useCartHydrated } from '@/storage/useCartHydrated';
import { routes } from '@/utils/routes';

import {
  Actions,
  CartLink,
  CartIconWrapper,
  CartBadge,
  LanguageSwitch,
  ThemeSwitch,
  ThemeOption,
} from './Header.styles';

export default function HeaderActions() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mode, toggleTheme } = useTheme();

  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);

  const cartCount = hydrated ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  function changeLanguage() {
    const queryString = searchParams.toString();

    const destination = queryString ? `${path}?${queryString}` : path;

    router.replace(destination, {
      locale: locale === 'fa' ? 'en' : 'fa',
    });
  }

  return (
    <Actions>
      <CartLink href={routes.cart} aria-label={t('cart')}>
        <CartIconWrapper>
          <ShoppingCart size={22} />

          {hydrated && cartCount > 0 && <CartBadge>{cartCount > 99 ? '99+' : cartCount}</CartBadge>}
        </CartIconWrapper>
      </CartLink>

      <LanguageSwitch type="button" aria-label={t('language')} onClick={changeLanguage}>
        <span className={locale === 'fa' ? '' : 'inactive'}>FA</span>
        <span className="separator">|</span>
        <span className={locale === 'en' ? '' : 'inactive'}>EN</span>
      </LanguageSwitch>

      <ThemeSwitch>
        <ThemeOption
          type="button"
          $active={mode === 'light'}
          aria-label="Light mode"
          aria-pressed={mode === 'light'}
          onClick={() => {
            if (mode !== 'light') toggleTheme();
          }}
        >
          <Sun size={18} />
        </ThemeOption>

        <ThemeOption
          type="button"
          $active={mode === 'dark'}
          aria-label="Dark mode"
          aria-pressed={mode === 'dark'}
          onClick={() => {
            if (mode !== 'dark') toggleTheme();
          }}
        >
          <Moon size={18} />
        </ThemeOption>
      </ThemeSwitch>
    </Actions>
  );
}
