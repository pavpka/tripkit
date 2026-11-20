import { useEffect } from 'react';
import { sessionQueries } from '@/entities/session';
import { ApiError, queryClient } from '@/shared/api';

export function useSessionExpiry() {
    useEffect(
        () =>
            queryClient.getQueryCache().subscribe(({ query }) => {
                const { error } = query.state;
                if (error instanceof ApiError && error.status === 401)
                    queryClient.setQueryData(sessionQueries.me().queryKey, null);
            }),
        [],
    );
}