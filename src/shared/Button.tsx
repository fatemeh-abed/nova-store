'use client';
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import styled, {css} from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {variant?: Variant; fullWidth?: boolean; children: ReactNode};
const StyledButton = styled.button<{$variant: Variant; $fullWidth: boolean}>`
  display: inline-flex; align-items: center; justify-content: center; gap: ${({theme}) => theme.tokens.spacing.sm};
  min-height: ${({theme}) => theme.tokens.sizes.control}; padding-inline: ${({theme}) => theme.tokens.spacing.lg};
  border-radius: ${({theme}) => theme.tokens.radii.md}; font-weight: 700; cursor: pointer;
  width: ${({$fullWidth}) => $fullWidth ? '100%' : 'auto'};
  transition: transform .15s ease, background .15s ease;
  &:active:not(:disabled) { transform: translateY(1px); }
  &:disabled { opacity: .5; cursor: not-allowed; }
  ${({$variant, theme}) => $variant === 'primary' ? css`background: ${theme.tokens.colors.orange}; color: ${theme.tokens.colors.white}; border: 1px solid ${theme.tokens.colors.orange};` :
  $variant === 'secondary' ? css`background: ${theme.colors.surface}; color: ${theme.colors.text}; border: 1px solid ${theme.colors.border};` :
  css`background: transparent; color: ${theme.colors.text}; border: 1px solid transparent;`}
`;
export default function Button({variant = 'primary', fullWidth = false, children, ...props}: Props) {
  return <StyledButton $variant={variant} $fullWidth={fullWidth} {...props}>{children}</StyledButton>;
}
