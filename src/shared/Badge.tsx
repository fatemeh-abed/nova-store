import type {ReactNode} from 'react';
import styled from 'styled-components';
const BadgeRoot = styled.span`
  display: inline-flex; align-items: center; padding: ${({theme}) => theme.tokens.spacing.xs} ${({theme}) => theme.tokens.spacing.sm};
  background: ${({theme}) => theme.colors.subtle}; color: ${({theme}) => theme.colors.text};
  border-radius: ${({theme}) => theme.tokens.radii.pill}; font-size: .75rem; font-weight: 600;
`;
export default function Badge({children}: {children: ReactNode}) {return <BadgeRoot>{children}</BadgeRoot>;}
