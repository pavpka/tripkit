import type { Trip, TripStatus } from './types';
import { ALLOWED_TRANSITIONS } from './constants';
import { countDaysInclusive, toISODate } from '@/shared/lib/dates';

export type TransitionResult = { ok: true } | { ok: false; reason: string };
export type TransitionTrip = Pick<Trip, 'startDate' | 'endDate'> & {
    daysCount: number;
};

export function canTransition(
    from: TripStatus,
    to: TripStatus,
    trip: TransitionTrip,
    now: Date,
): TransitionResult {
    if (from === to) return { ok: false, reason: 'Поездка уже в этом статусе' };
    if (from === 'done')
        return { ok: false, reason: 'Завершённую поездку нельзя изменить' };
    if (!ALLOWED_TRANSITIONS[from].includes(to)) {
        return {
            ok: false,
            reason: 'Такой переход недоступен: этапы нельзя перескакивать',
        };
    }
    const today = toISODate(now);
    switch (to) {
        case 'planning':
            if (!trip.startDate || !trip.endDate)
                return { ok: false, reason: 'Укажи даты поездки' };
            if (trip.daysCount === 0)
                return {
                    ok: false,
                    reason: 'Добавь хотя бы один день маршрута',
                };
            return { ok: true };
        case 'ongoing':
            if (!trip.startDate || today < trip.startDate)
                return { ok: false, reason: 'Поездка ещё не началась' };
            return { ok: true };
        case 'done':
            if (!trip.endDate || today < trip.endDate)
                return { ok: false, reason: 'Поездка ещё не закончилась' };
            return { ok: true };
        default:
            return { ok: true }; // booked, cancelled — допусловий нет
    }
}

export function isDateInTrip(
    date: string | Date,
    trip: Pick<Trip, 'startDate' | 'endDate'>,
): boolean {
    if (!trip.startDate || !trip.endDate) return false; // у idea дат может не быть
    const d = toISODate(date);
    return d >= trip.startDate && d <= trip.endDate;
}

export type BudgetStatus = 'unset' | 'ok' | 'warning' | 'over';

export interface BudgetState {
    status: BudgetStatus;
    percent: number;
    remaining: number;
}

export function getBudgetState(
    spent: number,
    budgetTotal?: number | null,
): BudgetState {
    if (!budgetTotal || budgetTotal <= 0)
        return { status: 'unset', percent: 0, remaining: 0 };
    const ratio = spent / budgetTotal;
    const status: BudgetStatus =
        ratio > 1 ? 'over' : ratio >= 0.8 ? 'warning' : 'ok';
    return {
        status,
        percent: Math.round(ratio * 100),
        remaining: budgetTotal - spent,
    };
}

export function getTripDaysCount(trip: Trip) {
    return trip.startDate && trip.endDate
        ? countDaysInclusive(trip.startDate, trip.endDate)
        : 0;
}

const formatHintDate = (date: Date) =>
    date
        .toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
        .replace('.', '');

const getBookedHint = (trip: Trip, now: Date) => {
    if (!trip.startDate) return '';
    const startDate = new Date(trip.startDate);
    return startDate > now
        ? `Следующий шаг станет доступен ${formatHintDate(startDate)}`
        : '';
};

export const getStatusHint = (trip: Trip, tripActivitiesCount: number) => {
    switch (trip.status) {
        case 'idea':
            if (!trip.startDate || !trip.endDate) {
                return `Добавьте даты поездки, чтобы начать планирование`;
            }
            return '';
        case 'planning':
            if (tripActivitiesCount === 0) {
                return 'Отметьте хотя бы одно бронирование';
            }
            return '';
        case 'booked':
            return getBookedHint(trip, new Date());
        default:
            return '';
    }
};
