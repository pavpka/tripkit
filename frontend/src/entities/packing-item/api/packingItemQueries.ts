import { queryOptions } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import { packingItemApi } from './packingItemApi';

export const packingItemQueries = {
    byTrip: (tripId: TripId) =>
        queryOptions({
            queryKey: ['trips', tripId, 'packing-items'],
            queryFn: ({ signal }) =>
                packingItemApi.getAllByTripId(tripId, { signal }),
        }),
};
