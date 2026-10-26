import type { ExpenseCategory } from './types';

export interface ExpenseMeta {
    icon: string;
    soft: string;
    bar: string;
    label: string;
}

export const EXPENSE_META: Record<ExpenseCategory, ExpenseMeta> = {
    transport: {
        icon: 'transport.png',
        soft: 'var(--cat-transport)',
        bar: 'var(--cat-transport-bar)',
        label: 'Транспорт',
    },
    food: {
        icon: 'food.png',
        soft: 'var(--cat-food)',
        bar: 'var(--cat-food-bar)',
        label: 'Еда',
    },
    tickets: {
        icon: 'tickets.png',
        soft: 'var(--cat-tickets)',
        bar: 'var(--cat-tickets-bar)',
        label: 'Билеты',
    },
    hotel: {
        icon: 'hotel.png',
        soft: 'var(--cat-hotel)',
        bar: 'var(--cat-hotel-bar)',
        label: 'Отель',
    },
    other: {
        icon: 'other.png',
        soft: 'var(--cat-other)',
        bar: 'var(--cat-other-bar)',
        label: 'Другое',
    },
    shopping: {
        icon: 'shopping.png',
        soft: 'var(--cat-shopping)',
        bar: 'var(--cat-shopping-bar)',
        label: 'Покупки',
    },
};

export const getExpenseMeta = (category: string): ExpenseMeta =>
    (EXPENSE_META as Record<string, ExpenseMeta>)[category] ??
    EXPENSE_META.other;
