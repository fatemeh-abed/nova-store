import styled, {keyframes} from 'styled-components';
const pulse=keyframes`0%,100%{opacity:.5}50%{opacity:1}`;
export const Skeleton=styled.div`min-height:24px;background:${({theme})=>theme.colors.subtle};border-radius:${({theme})=>theme.tokens.radii.md};animation:${pulse} 1.3s ease-in-out infinite;@media(prefers-reduced-motion:reduce){animation:none;}`;
export default Skeleton;
