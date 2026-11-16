'use client';
import styled from 'styled-components';
const Wrap = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.tokens.spacing.sm};
`;
const Page = styled.button<{ $active: boolean }>`
  min-width: ${({ theme }) => theme.tokens.sizes.control};
  min-height: ${({ theme }) => theme.tokens.sizes.control};
  border-radius: ${({ theme }) => theme.tokens.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $active }) => ($active ? theme.tokens.colors.navy : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.tokens.colors.white : theme.colors.text)};
  cursor: pointer;
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  label: string;
  previousLabel: string;
  nextLabel: string;
};
export default function Pagination({
  page,
  totalPages,
  onChange,
  label,
  previousLabel,
  nextLabel,
}: Props) {
  if (totalPages <= 1) return null;
  return (
    <Wrap aria-label={label}>
      <Page
        type="button"
        $active={false}
        disabled={page <= 1}
        aria-label={previousLabel}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </Page>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <Page
          key={number}
          type="button"
          $active={page === number}
          aria-current={page === number ? 'page' : undefined}
          onClick={() => onChange(number)}
        >
          {number}
        </Page>
      ))}
      <Page
        type="button"
        $active={false}
        disabled={page >= totalPages}
        aria-label={nextLabel}
        onClick={() => onChange(page + 1)}
      >
        ›
      </Page>
    </Wrap>
  );
}
