import { queryOptions } from '@tanstack/react-query';
import type { TripId } from '@/shared/types';
import { tripApi } from './tripApi';

export const tripQueries = {
    all: () => ['trips'] as const,
    list: () =>
        queryOptions({
            queryKey: [...tripQueries.all(), 'list'],
            queryFn: ({ signal }) => tripApi.getAll({ signal }),
        }),
    detail: (id: TripId) =>
        queryOptions({
            queryKey: [...tripQueries.all(), 'detail', id],
            queryFn: ({ signal }) => tripApi.getById(id, { signal }),
        }),
};
