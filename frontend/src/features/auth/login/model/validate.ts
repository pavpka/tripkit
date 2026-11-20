import type { LoginCredentials } from '../api/login';

export type LoginErrors = Partial<Record<keyof LoginCredentials, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ email, password }: LoginCredentials): LoginErrors {
    const errors: LoginErrors = {};
    if (!email.trim()) errors.email = 'Введите email';
    else if (!EMAIL_PATTERN.test(email)) errors.email = 'Некорректный email';

    if (!password) errors.password = 'Введите пароль';
    else if (password.length < 8) errors.password = 'Минимум 8 символов';

    return errors;
}