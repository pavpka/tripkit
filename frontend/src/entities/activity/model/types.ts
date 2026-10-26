import type { ActivityId, DayId, TripId } from '@/shared/types';

export type ActivityType =
    'sight' | 'food' | 'transport' | 'hotel' | 'shopping' | 'other';
export type BookingStatus = 'todo' | 'booked';

export interface Activity {
    id: ActivityId;
    tripId: TripId;
    dayId: DayId | null; // null = “Без дня”
    title: string;
    type: ActivityType;

    address: string | null;
    url: string | null;

    startTime: string | null; // 'HH:mm:ss'
    endTime: string | null; // 'HH:mm:ss'

    costEstimate: number | null;
    bookingStatus: BookingStatus | null;
    note: string | null;
    order: number;
}
