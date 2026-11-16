'use client';

import { useTranslations } from 'next-intl';
import { routes } from '@/utils/routes';

import { Group, GroupTitle, FooterLink, FooterText } from './Footer.styles';

export default function FooterLinks() {
  const t = useTranslations('landing');

  return (
    <>
      <Group>
        <GroupTitle>{t('footerHelp')}</GroupTitle>

        <FooterText>{t('footerShipping')}</FooterText>
        <FooterText>{t('footerReturns')}</FooterText>
        <FooterText>{t('footerFaq')}</FooterText>
      </Group>

      <Group>
        <GroupTitle>{t('footerUseful')}</GroupTitle>

        <FooterLink href={routes.home}>{t('footerAbout')}</FooterLink>

        <FooterLink href={`${routes.home}#products`}>{t('featured')}</FooterLink>

        <FooterLink href={routes.home}>{t('footerContact')}</FooterLink>
      </Group>
    </>
  );
}
