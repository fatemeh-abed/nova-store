'use client';

import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchBox } from './Header.styles';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function HeaderSearch({ query, onQueryChange, onSubmit }: Props) {
  const t = useTranslations('nav');

  return (
    <SearchBox role="search" onSubmit={onSubmit}>
      <input
        name="search"
        type="search"
        aria-label={t('search')}
        placeholder={t('search')}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <button type="submit" aria-label={t('search')}>
        <Search size={19} />
      </button>
    </SearchBox>
  );
}
