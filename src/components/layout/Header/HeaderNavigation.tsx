'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { routes } from '@/utils/routes';

import { Navigation, NavLink } from './Header.styles';

export const headerLinks = [
  { id: 'home', href: routes.home },
  { id: 'products', href: `${routes.home}#products` },
  { id: 'categories', href: `${routes.home}#categories` },
] as const;

export default function HeaderNavigation() {
  const t = useTranslations('nav');
  const path = usePathname();

  return (
    <Navigation aria-label={t('menu')}>
      {headerLinks.map((link) => (
        <NavLink
          key={link.id}
          href={link.href}
          $active={path === routes.home && link.id === 'home'}
        >
          {t(link.id)}
        </NavLink>
      ))}
    </Navigation>
  );
}
