'use client';

import {createContext, useContext, useMemo, useState} from 'react';

type ThemeMode = 'light' | 'dark';
type ThemeContextValue = {mode: ThemeMode; toggleTheme: () => void};
const ThemeContext = createContext<ThemeContextValue | null>(null);
export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const value = useMemo(() => ({mode, toggleTheme: () => setMode((prev) => prev === 'light' ? 'dark' : 'light')}), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
