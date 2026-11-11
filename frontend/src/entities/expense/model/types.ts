import type {
    ActivityId,
    CurrencyCode,
    ExpenseId,
    TripId,
} from '@/shared/types';

export type ExpenseCategory =
    'transport' | 'food' | 'tickets' | 'hotel' | 'shopping' | 'other';

export interface Expense {
    id: ExpenseId;
    tripId: TripId;
    category: ExpenseCategory;

    // best practice: хранить в "центах/копейках"
    amount: number;

    currency: CurrencyCode;
    date: string; // 'YYYY-MM-DD'

    activityId?: ActivityId | null;
    description: string | null;
}

export type ExpenseInput = Omit<Expense, 'id' | 'tripId'>;