import type { CurrencyCode } from '@/shared/types';

export const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
};

export const getCurrencySymbol = (code: CurrencyCode): string =>
    CURRENCY_SYMBOL[code] ?? code;