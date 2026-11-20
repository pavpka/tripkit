import { ApiError, apiClient, type RequestOptions } from '@/shared/api';
import type { SessionUser } from '../model';

export const sessionApi = {
    getMe: async (options?: RequestOptions): Promise<SessionUser | null> => {
        try {
            return await apiClient.get<SessionUser>('/auth/me', options);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) return null;
            throw error;
        }
    },
};