import 'styled-components';
import type {palettes, tokens} from '@/shared/theme';
declare module 'styled-components' {
  export interface DefaultTheme {
    tokens: typeof tokens;
    colors: (typeof palettes)[keyof typeof palettes];
  }
}
