'use client';

import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProductSort } from '@/types/enums/ProductSort';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  min-height: 44px;
  padding: 0 14px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Select = styled.select`
  appearance: none;
  min-height: 42px;
  min-width: 125px;

  padding: 8px 4px;
  padding-inline-end: 24px;

  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  border: none;
  outline: none;

  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.tokens.colors.orange};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ArrowIcon = styled(ChevronDown)`
  position: absolute;
  inset-inline-end: 4px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text};
`;

interface ProductSortSelectProps {
  value: ProductSort;
  onChange: (value: ProductSort) => void;
}

export default function ProductSortSelect({ value, onChange }: ProductSortSelectProps) {
  const t = useTranslations('productSort');

  return (
    <Wrapper>
      <Label htmlFor="product-sort-select">{t('label')}</Label>

      <SelectWrapper>
        <Select
          id="product-sort-select"
          value={value}
          onChange={(event) => onChange(event.target.value as ProductSort)}
        >
          <option value={ProductSort.PriceAsc}>{t('priceAsc')}</option>

          <option value={ProductSort.PriceDesc}>{t('priceDesc')}</option>

          <option value={ProductSort.TitleAsc}>{t('titleAsc')}</option>

          <option value={ProductSort.TitleDesc}>{t('titleDesc')}</option>
        </Select>

        <ArrowIcon size={16} aria-hidden="true" />
      </SelectWrapper>
    </Wrapper>
  );
}
