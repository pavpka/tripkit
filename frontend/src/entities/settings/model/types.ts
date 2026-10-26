import type { CurrencyCode } from '@/shared/types';

export type Theme = 'light' | 'dark' | 'system';

export interface Settings {
    defaultCurrency: CurrencyCode;
    theme?: Theme;
}
