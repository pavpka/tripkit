import type { DayId, TripId } from '@/shared/types';

export interface Day {
    id: DayId;
    tripId: TripId;
    date: string; // 'YYYY-MM-DD'
    title: string | null;
}
