import styled from 'styled-components';
const Root = styled.div`
  padding: ${({ theme }) => theme.tokens.spacing.xxl};
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.tokens.radii.lg};
`;
export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Root role="status">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Root>
  );
}
