import type { CurrencyCode, TripId } from '@/shared/types';

export interface Trip {
    id: TripId;
    title: string;
    destinations: string[];

    // idea может быть без дат
    startDate: string | null; // 'YYYY-MM-DD'
    endDate: string | null; // 'YYYY-MM-DD'

    status: TripStatus;

    budgetTotal: number | null;
    currency: CurrencyCode;

    travelersCount: number;

    coverNote?: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    emoji: string;
    titleColor: string;

    packingItemsCount?: number;
    packedItemsCount?: number;
}

export type TripStatus =
    'idea' | 'planning' | 'booked' | 'ongoing' | 'done' | 'cancelled';

export type Color = 'gray' | 'blue' | 'yellow' | 'cyan' | 'green' | 'red';
