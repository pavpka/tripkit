import type { Expense } from '@/entities/expense';
import type { Settings } from '@/entities/settings';

export const expenses: Expense[] = [
    {
        id: '1',
        tripId: '1',
        category: 'transport',
        amountMinor: 500,
        currency: 'USD',
        date: '2026-01-01',
        title: 'Перелет',
    },
    {
        id: '2',
        tripId: '2',
        category: 'food',
        amountMinor: 600,
        currency: 'USD',
        date: '2026-01-02',
        title: 'Ужин',
    },
    {
        id: '3',
        tripId: '2',
        category: 'hotel',
        amountMinor: 500,
        currency: 'USD',
        date: '2026-01-03',
        title: 'Отель на 5 ночей',
    },
];

export const settings: Settings = {
    defaultCurrency: 'USD',
    theme: 'dark',
};
