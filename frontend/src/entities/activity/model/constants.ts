import type { ActivityType } from './types';

export const ACTIVITY_ICONS: Record<ActivityType, string> = {
    sight: 'museum.png',
    food: 'food.png',
    transport: 'plane.png',
    hotel: 'hotel.png',
    shopping: 'shopping.png',
    other: 'other.png',
};

export const getActivityIcon = (type: string): string =>
    (ACTIVITY_ICONS as Record<string, string>)[type] ?? ACTIVITY_ICONS.other;
