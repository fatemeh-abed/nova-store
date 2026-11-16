'use client';

import type { FormEvent } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import { headerLinks } from './HeaderNavigation';
import { Mobile, IconButton, Drawer } from './Header.styles';

type Props = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function MobileNavigation({
  open,
  onToggle,
  onClose,
  query,
  onQueryChange,
  onSubmit,
}: Props) {
  const t = useTranslations('nav');

  return (
    <>
      <Mobile>
        <IconButton
          type="button"
          aria-label={open ? t('close') : t('menu')}
          aria-expanded={open}
          aria-controls="nova-mobile-navigation"
          onClick={onToggle}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </IconButton>
      </Mobile>

      {open && (
        <Mobile>
          <Drawer id="nova-mobile-navigation" aria-label={t('menu')}>
            {headerLinks.map((link) => (
              <Link key={link.id} href={link.href} onClick={onClose}>
                {t(link.id)}
              </Link>
            ))}

            <form role="search" onSubmit={onSubmit}>
              <input
                type="search"
                aria-label={t('search')}
                placeholder={t('search')}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
              />

              <button type="submit" aria-label={t('search')}>
                <Search size={18} />
              </button>
            </form>
          </Drawer>
        </Mobile>
      )}
    </>
  );
}
