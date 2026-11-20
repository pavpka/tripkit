import { useState } from 'react';
import { ApiError } from '@/shared/api';
import { login, type LoginCredentials } from '../api/login';
import { validateLogin, type LoginErrors } from './validate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router';
import { sessionQueries } from '@/entities/session';

const EMPTY_CREDENTIALS: LoginCredentials = { email: '', password: '' };

export function useLogin() {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState(EMPTY_CREDENTIALS);
    const [errors, setErrors] = useState<LoginErrors>({});

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            queryClient.setQueryData(sessionQueries.me().queryKey, user);
            const from = (location.state as { from?: { pathname: string } } | null)?.from;
            navigate(from?.pathname ?? '/', { replace: true });
        },
    });

    function setField(field: keyof LoginCredentials, value: string) {
        setCredentials((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    function submit() {
        const nextErrors = validateLogin(credentials);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        mutation.mutate(credentials);
    }

    return {
        credentials,
        errors,
        setField,
        submit,
        isPending: mutation.isPending,
        formError: toFormError(mutation.error),
    };
}

function toFormError(error: unknown): string | null {
    if (!error) return null;
    if (error instanceof ApiError && error.status === 401)
        return 'Неверный email или пароль';
    return 'Не удалось войти. Попробуйте ещё раз';
}