'use client';

import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import heroBannerFa from '@/assets/Images/hero-fa.webp';
import heroBannerEn from '@/assets/Images/hero-en.webp';

const Hero = styled.section<{ $background: string }>`
  margin-block: 20px 28px;
  min-height: 350px;
  border-radius: ${({ theme }) => theme.tokens.radii.lg};

  background-image: url('${({ $background }) => $background}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 40px 7%;
`;

const HeroText = styled.div<{ $isEnglish: boolean }>`
  flex: 1;
  min-width: 0;

  direction: ${({ $isEnglish }) => ($isEnglish ? 'ltr' : 'rtl')};
  text-align: ${({ $isEnglish }) => ($isEnglish ? 'left' : 'right')};

  h1 {
    font-size: clamp(23px, 3vw, 38px);
    line-height: 1.4;
    margin: 0 0 12px;
  }

  p {
    font-size: clamp(13px, 1.6vw, 17px);
    margin: 0 0 24px;
  }
`;

const HeroLink = styled.a`
  background: ${({ theme }) => theme.tokens.colors.orange};
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 100px;
  text-decoration: none;

  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: -12px;
  margin-bottom: 28px;
`;

const Dot = styled.span<{ $active: boolean }>`
  display: block;
  width: ${({ $active }) => ($active ? '22px' : '8px')};
  height: 8px;
  border-radius: 100px;

  background-color: ${({ $active, theme }) =>
    $active ? theme.tokens.colors.orange : theme.colors.border};

  transition: all 0.3s ease;
`;

export default function HeroSection() {
  const t = useTranslations('landing');
  const locale = useLocale();

  const isEnglish = locale === 'en';

  const heroImage = isEnglish ? heroBannerEn.src : heroBannerFa.src;

  const Arrow = isEnglish ? ArrowRight : ArrowLeft;

  return (
    <>
      <Hero $background={heroImage} dir={isEnglish ? 'ltr' : 'rtl'} aria-labelledby="hero-title">
        <HeroText $isEnglish={isEnglish}>
          <h1 id="hero-title">{t('heroTitle')}</h1>
          <p>{t('heroSubtitle')}</p>

          <HeroLink href="#products">
            {t('viewProducts')}
            <Arrow size={17} />
          </HeroLink>
        </HeroText>
      </Hero>

      <SliderDots aria-hidden="true">
        <Dot $active={true} />
        <Dot $active={false} />
        <Dot $active={false} />
      </SliderDots>
    </>
  );
}
