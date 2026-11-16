'use client';

import styled from 'styled-components';

type LogoVariant = 'default' | 'light';

interface NovaLogoProps {
  size?: number;
  variant?: LogoVariant;
}

const Wrapper = styled.div<{
  $size: number;
  $variant: LogoVariant;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  direction: ltr;

  font-family: Arial, sans-serif;
  font-weight: 900;
  letter-spacing: 0.5px;

  font-size: ${({ $size }) => $size}px;
  line-height: 1;

  color: ${({ theme, $variant }) => ($variant === 'light' ? '#ffffff' : theme.colors.text)};

  white-space: nowrap;
`;

const BagBody = styled.path`
  fill: ${({ theme }) => theme.tokens.colors.orange};
`;

const BagHandle = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.tokens.colors.orange};
  stroke-width: 2.2;
  stroke-linecap: round;
`;

export default function NovaLogo({ size = 30, variant = 'default' }: NovaLogoProps) {
  return (
    <Wrapper $size={size} $variant={variant} aria-label="NOVA">
      <span>NOVA</span>

      <svg width={size * 0.85} height={size} viewBox="0 0 24 28" aria-hidden="true">
        <BagBody d="M2 9h20l-1.8 17H3.8L2 9z" />

        <BagHandle d="M7 9a5 5 0 0 1 10 0" />
      </svg>
    </Wrapper>
  );
}
