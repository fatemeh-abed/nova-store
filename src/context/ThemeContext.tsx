'use client';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {ThemeProvider as StyledThemeProvider, createGlobalStyle} from 'styled-components';
import {palettes, tokens, type ThemeMode} from '@/shared/theme';

type ThemeContextValue = {mode: ThemeMode; toggleTheme: () => void};
const ThemeContext = createContext<ThemeContextValue | null>(null);
const GlobalTheme = createGlobalStyle`
  body { background: ${({theme}) => theme.colors.background}; color: ${({theme}) => theme.colors.text}; transition: background .2s ease, color .2s ease; }
  a { color: inherit; }
  :focus-visible { outline: 3px solid ${tokens.colors.orange}; outline-offset: 3px; }
`;
export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [mode, setMode] = useState<ThemeMode>('light');
  useEffect(() => {
    try { if (localStorage.getItem('nova-theme') === 'dark') setMode('dark'); } catch { /* Storage may be blocked. */ }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    try { localStorage.setItem('nova-theme', mode); } catch { /* Storage may be blocked. */ }
  }, [mode]);
  const value = useMemo(() => ({mode, toggleTheme: () => setMode((previous) => previous === 'light' ? 'dark' : 'light')}), [mode]);
  const theme = useMemo(() => ({tokens, colors: palettes[mode]}), [mode]);
  return <ThemeContext.Provider value={value}><StyledThemeProvider theme={theme}><GlobalTheme />{children}</StyledThemeProvider></ThemeContext.Provider>;
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
