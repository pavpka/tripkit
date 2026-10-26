import type { Color, TripStatus } from './types';
import type { BudgetStatus } from './rules';

export const TRIP_STATUSES: TripStatus[] = [
    'idea',
    'planning',
    'booked',
    'ongoing',
    'done',
    'cancelled',
];

export const COLORS: Record<Color, { color: string; badgeColor: string }> = {
    gray: { color: '#6b6b75', badgeColor: '#6b6b751F' },
    blue: { color: '#3a68b8', badgeColor: '#e6f0ff' },
    yellow: { color: '#9a6b12', badgeColor: '#fff1d6' },
    green: { color: '#2e7d4f', badgeColor: '#e3f4e8' },
    red: { color: '#8a5a73', badgeColor: '#f4e9ef' },
    cyan: { color: '#2b7480', badgeColor: '#dcf0f3' },
};

export interface TripStatusMeta {
    label: string;
    color: Color;
    index: number;
}

export const TRIP_STATUS_META: Record<TripStatus, TripStatusMeta> = {
    idea: { label: 'Идея', color: 'blue', index: 1 },
    planning: { label: 'Планирование', color: 'yellow', index: 2 },
    booked: { label: 'Забронировано', color: 'green', index: 3 },
    ongoing: { label: 'В пути', color: 'cyan', index: 4 },
    done: { label: 'Завершено', color: 'gray', index: 5 },
    cancelled: { label: 'Отменено', color: 'red', index: 0 },
};

export const UNKNOWN_TRIP_STATUS_META: TripStatusMeta = {
    label: 'Неизвестно',
    color: 'gray',
    index: 0,
};

export const getTripStatusMeta = (status: string): TripStatusMeta =>
    (TRIP_STATUS_META as Record<string, TripStatusMeta>)[status] ??
    UNKNOWN_TRIP_STATUS_META;

export const BUDGET_STATUS_COLORS: Record<BudgetStatus, string> = {
    unset: 'var(--color-muted)',
    ok: 'var(--color-ok)',
    warning: 'var(--color-warn)',
    over: 'var(--color-bad)',
};

export const ALLOWED_TRANSITIONS: Record<TripStatus, TripStatus[]> = {
    idea: ['planning', 'cancelled'],
    planning: ['booked', 'cancelled'],
    booked: ['ongoing', 'cancelled'],
    ongoing: ['done', 'cancelled'],
    done: [],
    cancelled: ['planning', 'booked'],
};
