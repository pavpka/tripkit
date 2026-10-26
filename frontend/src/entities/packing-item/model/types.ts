import type { PackingItemId, TripId } from '@/shared/types';

export type PackingCategory = 'clothes' | 'docs' | 'tech' | 'hygiene' | 'other';

export interface PackingItem {
    id: PackingItemId;
    tripId: TripId;
    label: string;
    qty: number;
    packed: boolean;
    category: PackingCategory;
}

export type PackingItemInput = Omit<PackingItem, 'id' | 'tripId'>;

export interface PackingCategoryGroup {
    category: PackingCategory;
    items: PackingItem[];
}

export interface CategoryDetails {
    label: string;
    icon: string;
    bgColor: string;
}
