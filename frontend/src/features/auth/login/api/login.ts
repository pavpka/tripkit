import type { SessionUser } from '@/entities/session';
import { apiClient } from '@/shared/api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export function login(credentials: LoginCredentials) {
    return apiClient.post<SessionUser>('/auth/login', credentials);
}