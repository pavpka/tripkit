import { queryOptions } from '@tanstack/react-query';
import { sessionApi } from './sessionApi';

export const sessionQueries = {
    all: () => ['session'] as const,
    me: () =>
        queryOptions({
            queryKey: [...sessionQueries.all(), 'me'],
            queryFn: ({ signal }) => sessionApi.getMe({ signal }),
            staleTime: Infinity,
            retry: false,
        }),
};