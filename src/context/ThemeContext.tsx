'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

import { palettes, tokens, type ThemeMode } from '@/shared/theme';

type ThemeContextValue = {
  mode: ThemeMode;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'nova-theme';
const THEME_EVENT = 'nova-theme-change';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const GlobalTheme = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background .2s ease, color .2s ease;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 3px solid ${tokens.colors.orange};
    outline-offset: 3px;
  }
`;

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getServerSnapshot(): ThemeMode {
  return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      toggleTheme: () => {
        const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light';

        try {
          localStorage.setItem(STORAGE_KEY, nextMode);
          window.dispatchEvent(new Event(THEME_EVENT));
        } catch {
          // Storage may be unavailable.
        }
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () => ({
      tokens,
      colors: palettes[mode],
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalTheme />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return value;
}
