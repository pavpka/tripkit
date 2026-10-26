import { queryOptions } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import { dayApi } from './dayApi';

export const dayQueries = {
    byTrip: (tripId: TripId) =>
        queryOptions({
            queryKey: ['trips', tripId, 'days'],
            queryFn: ({ signal }) => dayApi.getAllByTripId(tripId, { signal }),
        }),
};
