'use client';

import { useTranslations } from 'next-intl';
import NovaLogo from '@/components/NovaLogo/NovaLogo';

import { BrandGroup, LogoWrapper, Description } from './Footer.styles';

export default function FooterBrand() {
  const t = useTranslations('landing');

  return (
    <BrandGroup>
      <LogoWrapper>
        <NovaLogo size={32} variant="light" />
      </LogoWrapper>

      <Description>{t('footerInfo')}</Description>
    </BrandGroup>
  );
}
