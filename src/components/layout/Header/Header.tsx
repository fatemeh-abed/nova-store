'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import NovaLogo from '@/components/NovaLogo/NovaLogo';
import { routes } from '@/utils/routes';

import { Bar, Inner, Brand } from './Header.styles';
import HeaderNavigation from './HeaderNavigation';
import HeaderSearch from './HeaderSearch';
import HeaderActions from './HeaderActions';
import MobileNavigation from './MobileNavigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get('q') ?? '';

  const [open, setOpen] = useState(false);

  const [searchDraft, setSearchDraft] = useState<{
    urlQuery: string;
    value: string;
  } | null>(null);

  const query = searchDraft?.urlQuery === urlQuery ? searchDraft.value : urlQuery;

  function updateQuery(value: string) {
    setSearchDraft({ urlQuery, value });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = String(formData.get('search') ?? '').trim();

    const destination = search
      ? `${routes.home}?q=${encodeURIComponent(search)}#products`
      : routes.home;

    setSearchDraft(null);
    setOpen(false);
    router.push(destination);
  }

  return (
    <Bar>
      <Inner>
        <MobileNavigation
          open={open}
          onToggle={() => setOpen((value) => !value)}
          onClose={() => setOpen(false)}
          query={query}
          onQueryChange={updateQuery}
          onSubmit={submitSearch}
        />

        <Brand href={routes.home}>
          <NovaLogo size={32} />
        </Brand>

        <HeaderNavigation />

        <HeaderSearch query={query} onQueryChange={updateQuery} onSubmit={submitSearch} />

        <HeaderActions />
      </Inner>
    </Bar>
  );
}
