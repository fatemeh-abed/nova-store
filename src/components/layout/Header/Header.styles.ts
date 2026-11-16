import styled from 'styled-components';
import { Link } from '@/i18n/navigation';

export const Bar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  box-shadow: none;
  position: sticky;
  top: 0;
  z-index: 30;
  width: 100%;
`;

export const CartIconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -9px;
  right: -11px;

  min-width: 19px;
  height: 19px;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.tokens.colors.orange};
  color: #ffffff;
  border-radius: 999px;

  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  direction: ltr;
  pointer-events: none;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.tokens.sizes.content};
  margin-inline: auto;
  padding: 12px 16px;
  min-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;

  @media (min-width: 768px) {
    padding-inline: 20px;
    gap: 12px;
  }

  @media (min-width: 1024px) {
    padding: 12px 24px;
    min-height: 80px;
    gap: 20px;
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 650px) {
    font-size: 25px;
  }
`;

export const Navigation = styled.nav`
  display: none;
  align-items: center;
  gap: 20px;
  height: 48px;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: flex;
  }

  @media (min-width: 1280px) {
    gap: 28px;
  }
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;

  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.tokens.colors.orange};

    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.25s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

export const SearchBox = styled.form`
  display: none;
  align-items: center;
  flex: 1;
  max-width: 280px;
  min-width: 0;
  height: 40px;

  background: ${({ theme }) => theme.colors.subtle};
  border: none;
  border-radius: ${({ theme }) => theme.tokens.radii.pill};
  padding: 0 14px;

  input {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding: 8px;
    background: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    font-size: 12px;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    padding: 8px;
  }

  input:focus-visible {
    outline: 2px solid ${({ theme }) => theme.tokens.colors.orange};
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    gap: 12px;
  }

  @media (min-width: 1200px) {
    gap: 16px;
  }
`;

export const LanguageSwitch = styled.button`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  gap: 6px;
  padding: 6px 0;

  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;

  .inactive {
    opacity: 0.45;
  }

  .separator {
    opacity: 0.25;
    font-weight: 400;
  }
`;

export const ThemeSwitch = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px;

  background: ${({ theme }) => theme.colors.subtle};
  border-radius: 50px;
`;

export const ThemeOption = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  background: ${({ $active }) => ($active ? '#14243b' : 'transparent')};

  color: ${({ $active }) => ($active ? '#ffffff' : '#14243b')};

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Mobile = styled.div`
  display: block;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

export const Drawer = styled.nav`
  position: absolute;
  inset-inline: 0;
  top: 100%;
  z-index: 40;

  display: grid;
  gap: 16px;
  padding: 20px 16px;

  max-height: calc(100dvh - 68px);
  overflow-y: auto;
  overscroll-behavior: contain;

  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.tokens.shadows.card};

  a {
    display: flex;
    align-items: center;
    min-height: 44px;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: 700;
  }

  form {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  input {
    flex: 1;
    min-width: 0;
    min-height: 44px;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.subtle};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`;
