'use client';
import {useState} from 'react';
import styled from 'styled-components';
import Button from './Button';
import Chip from './Chip';
import Badge from './Badge';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import RatingStars from './RatingStars';
import Pagination from './Pagination';
import ThemeToggle from './ThemeToggle';
const Wrap = styled.section`max-width: ${({theme}) => theme.tokens.sizes.content}; margin-inline: auto; padding: ${({theme}) => theme.tokens.spacing.xl} ${({theme}) => theme.tokens.spacing.lg};`;
const Panel = styled.div`background: ${({theme}) => theme.colors.surface}; border: 1px solid ${({theme}) => theme.colors.border}; border-radius: ${({theme}) => theme.tokens.radii.lg}; box-shadow: ${({theme}) => theme.tokens.shadows.card}; padding: ${({theme}) => theme.tokens.spacing.xl};`;
const Row = styled.div`display: flex; flex-wrap: wrap; align-items: center; gap: ${({theme}) => theme.tokens.spacing.md}; margin-block: ${({theme}) => theme.tokens.spacing.lg};`;
type Copy = {title: string; intro: string; primary: string; secondary: string; disabled: string; chipOne: string; chipTwo: string; badge: string; loading: string; emptyTitle: string; emptyDescription: string; error: string; retry: string; rating: string; pagination: string; previous: string; next: string; toggle: string};
export default function Showcase({copy}: {copy: Copy}) {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(1);
  const [showError, setShowError] = useState(true);
  return <Wrap><h2>{copy.title}</h2><p>{copy.intro}</p><Panel>
    <Row><Button>{copy.primary}</Button><Button variant="secondary">{copy.secondary}</Button><Button disabled>{copy.disabled}</Button><ThemeToggle label={copy.toggle} /></Row>
    <Row><Chip selected={selected === 0} onClick={() => setSelected(0)}>{copy.chipOne}</Chip><Chip selected={selected === 1} onClick={() => setSelected(1)}>{copy.chipTwo}</Chip><Badge>{copy.badge}</Badge><RatingStars rate={4.7} count={80} label={copy.rating} /><Spinner label={copy.loading} /></Row>
    <EmptyState title={copy.emptyTitle} description={copy.emptyDescription} />
    <Row>{showError && <ErrorState message={copy.error} retryLabel={copy.retry} onRetry={() => setShowError(false)} />}</Row>
    <Pagination page={page} totalPages={3} onChange={setPage} label={copy.pagination} previousLabel={copy.previous} nextLabel={copy.next} />
  </Panel></Wrap>;
}
