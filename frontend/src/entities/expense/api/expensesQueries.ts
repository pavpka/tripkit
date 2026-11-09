import { queryOptions } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import { expensesApi } from './expensesApi';

export const expensesQueries = {
    byTrip: (tripId: TripId) =>
        queryOptions({
            queryKey: ['trips', tripId, 'expenses'],
            queryFn: ({ signal }) => expensesApi.getAll(tripId, { signal }),
        })
};
