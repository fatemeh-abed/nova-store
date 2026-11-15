'use client';
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import styled from 'styled-components';
const ChipButton = styled.button<{$selected: boolean}>`
  min-height: ${({theme}) => theme.tokens.sizes.control}; padding-inline: ${({theme}) => theme.tokens.spacing.lg};
  border: 1px solid ${({theme, $selected}) => $selected ? theme.tokens.colors.orange : theme.colors.border};
  background: ${({theme, $selected}) => $selected ? theme.tokens.colors.orange : theme.colors.surface};
  color: ${({theme, $selected}) => $selected ? theme.tokens.colors.white : theme.colors.text};
  border-radius: ${({theme}) => theme.tokens.radii.pill}; cursor: pointer; font-weight: 600;
`;
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {selected?: boolean; children: ReactNode};
export default function Chip({selected = false, children, ...props}: Props) {return <ChipButton type="button" aria-pressed={selected} $selected={selected} {...props}>{children}</ChipButton>;}
