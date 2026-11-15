import styled, {keyframes} from 'styled-components';
const spin = keyframes`to { transform: rotate(360deg); }`;
const SpinnerRoot = styled.span`
  display: inline-block; width: 24px; height: 24px; border: 3px solid ${({theme}) => theme.colors.border};
  border-top-color: ${({theme}) => theme.tokens.colors.orange}; border-radius: 50%; animation: ${spin} .75s linear infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
export default function Spinner({label}: {label: string}) {return <span role="status" aria-label={label}><SpinnerRoot /><span className="sr-only">{label}</span></span>;}
