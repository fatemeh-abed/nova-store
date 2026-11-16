'use client';

import { useTranslations } from 'next-intl';

import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';

import { Root, Inner, Bottom } from './Footer.styles';

export default function Footer() {
  const t = useTranslations('landing');

  return (
    <Root>
      <Inner>
        <FooterBrand />
        <FooterLinks />
        <FooterSocial />
      </Inner>

      <Bottom>
        © {new Date().getFullYear()} NOVA. {t('footerCopyright')}
      </Bottom>
    </Root>
  );
}
