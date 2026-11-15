import styled from 'styled-components';
const Rating = styled.span`display: inline-flex; align-items: center; gap: ${({theme}) => theme.tokens.spacing.xs};`;
const Star = styled.span`color: #f5b301;`;
export default function RatingStars({rate, count, label}: {rate: number; count: number; label: string}) {
  const safeRate = Math.max(0, Math.min(5, rate));
  return <Rating role="img" aria-label={label}><Star aria-hidden="true">★</Star><span>{safeRate.toFixed(1)} ({count})</span></Rating>;
}
