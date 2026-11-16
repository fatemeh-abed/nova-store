'use client';

import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { Laptop, Shirt, Gem, Headphones, Grid2X2 } from 'lucide-react';

import { getCategoryTitle } from '@/utils/productTranslations';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-block: 30px 38px;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  padding: 10px 18px;
  border-radius: 100px;

  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.tokens.colors.orange : theme.colors.border)};

  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.tokens.colors.orange};
  }
`;

const categoryIcons = {
  electronics: Laptop,
  jewelery: Gem,
  "men's clothing": Shirt,
  "women's clothing": Shirt,
} as const;

interface CategorySectionProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategorySection({
  categories,
  selectedCategory,
  onSelect,
}: CategorySectionProps) {
  const t = useTranslations('landing');
  const locale = useLocale();

  return (
    <Wrapper id="categories">
      <CategoryButton
        type="button"
        $active={selectedCategory === null}
        onClick={() => onSelect(null)}
        aria-pressed={selectedCategory === null}
      >
        <Grid2X2 size={18} />
        {t('all')}
      </CategoryButton>

      {categories.map((category) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons] ?? Headphones;

        const categoryTitle = getCategoryTitle(category, locale);

        return (
          <CategoryButton
            key={category}
            type="button"
            $active={selectedCategory === category}
            onClick={() => onSelect(category)}
            aria-pressed={selectedCategory === category}
          >
            <Icon size={18} />
            {categoryTitle}
          </CategoryButton>
        );
      })}
    </Wrapper>
  );
}
