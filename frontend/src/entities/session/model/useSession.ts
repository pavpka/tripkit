import { useQuery } from '@tanstack/react-query';
import { sessionQueries } from '../api/sessionQueries';

export function useSession() {
    const { data, isPending } = useQuery(sessionQueries.me());
    return {
        user: data ?? null,
        isAuthenticated: data != null,
        isLoading: isPending,
    };
}