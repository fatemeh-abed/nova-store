'use client';
import styled from 'styled-components';
import Button from './Button';
const Root = styled.div`
  padding: ${({ theme }) => theme.tokens.spacing.xl};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.tokens.colors.danger};
  border-radius: ${({ theme }) => theme.tokens.radii.lg};
`;
export default function ErrorState({
  message,
  retryLabel,
  onRetry,
}: {
  message: string;
  retryLabel: string;
  onRetry: () => void;
}) {
  return (
    <Root role="alert">
      <p>{message}</p>
      <Button onClick={onRetry}>{retryLabel}</Button>
    </Root>
  );
}
