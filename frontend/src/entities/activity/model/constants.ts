import type { ActivityType, CategoryDetails } from './types';

export const ACTIVITY_CATEGORY_DETAILS: Record<ActivityType, CategoryDetails> = {
    sight: { label: 'Достопримечательность', icon: '/icons/activities/museum.png', bgColor: '#E3F4E8' },
    food: { label: 'Еда', icon: '/icons/activities/food.png', bgColor: '#FFE6D5' },
    transport: { label: 'Транспорт', icon: '/icons/activities/plane.png', bgColor: '#E6F0FF' },
    hotel: { label: 'Жилье', icon: '/icons/activities/hotel.png', bgColor: '#F3EBDD' },
    shopping: { label: 'Покупки', icon: '/icons/activities/shopping.png', bgColor: '#EFE9FB' },
    other: { label: 'Другое', icon: '/icons/activities/other.png', bgColor: '#ECECEF' },
};

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
