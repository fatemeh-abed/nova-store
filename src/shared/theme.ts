export const tokens = {
  colors: {navy: '#14243b', orange: '#ff6a24', cream: '#fbfaf8', white: '#ffffff', charcoal: '#151b27', muted: '#697487', border: '#e3e7ee', success: '#21875a', danger: '#c33b46'},
  spacing: {xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px'},
  radii: {sm: '8px', md: '14px', lg: '22px', pill: '999px'},
  shadows: {card: '0 8px 30px rgb(20 36 59 / 8%)'},
  breakpoints: {mobile: '360px', tablet: '768px', desktop: '1024px', wide: '1280px'},
  sizes: {control: '44px', content: '1200px'},
} as const;
export type ThemeMode = 'light' | 'dark';
export const palettes = {
  light: {background: tokens.colors.cream, surface: tokens.colors.white, text: tokens.colors.navy, secondary: tokens.colors.muted, border: tokens.colors.border, subtle: '#f2f4f8'},
  dark: {background: '#101722', surface: '#1c2737', text: '#f5f7fc', secondary: '#b6c2d2', border: '#39475b', subtle: '#253247'},
} as const;
