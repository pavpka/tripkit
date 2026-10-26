import { apiClient, type RequestOptions } from '@/shared/api';
import type { PackingItemId, TripId } from '@/shared/types';
import type { PackingItem, PackingItemInput } from '../model/types';

const basePath = (tripId: TripId) => `/trips/${tripId}/packing-items`;

export const packingItemApi = {
    getAllByTripId: (tripId: TripId, options?: RequestOptions) =>
        apiClient.get<PackingItem[]>(basePath(tripId), options),
    create: (tripId: TripId, item: PackingItemInput) =>
        apiClient.post<string>(basePath(tripId), item),
    update: (tripId: TripId, id: PackingItemId, item: PackingItemInput) =>
        apiClient.put<string>(`${basePath(tripId)}/${id}`, item),
    delete: (tripId: TripId, id: PackingItemId) =>
        apiClient.delete(`${basePath(tripId)}/${id}`),
};
