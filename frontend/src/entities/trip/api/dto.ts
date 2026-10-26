import type { CurrencyCode } from '@/shared/types';
import type { Trip, TripStatus } from '../model/types';

export interface TripDto {
    id: string;
    title: string;
    destinations: string[];
    status: TripStatus;
    startDate: string | null;
    endDate: string | null;
    budget: number | null;
    currency: CurrencyCode;
    travellersCount: number;
    coverNote: string | null;
    emoji: string;
    color: string;
    createdAt: string;
    updatedAt: string;

   
    packingItemsCount?: number;
    packedItemsCount?: number;
}

export const mapTripDto = (dto: TripDto): Trip => ({
    id: dto.id,
    title: dto.title,
    destinations: dto.destinations,
    status: dto.status,
    startDate: dto.startDate,
    endDate: dto.endDate,
    budgetTotal: dto.budget,
    currency: dto.currency,
    travelersCount: dto.travellersCount,
    coverNote: dto.coverNote ?? undefined,
    emoji: dto.emoji,
    titleColor: dto.color,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    packingItemsCount: dto.packingItemsCount,
    packedItemsCount: dto.packedItemsCount,
});
