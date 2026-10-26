import { queryOptions } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import { activityApi } from './activityApi';

export const activityQueries = {
    byTrip: (tripId: TripId) =>
        queryOptions({
            queryKey: ['trips', tripId, 'activities'],
            queryFn: ({ signal }) =>
                activityApi.getAllByTripId(tripId, { signal }),
        }),
};
