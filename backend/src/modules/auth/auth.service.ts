import type { RegisterBody, LoginBody } from './auth.types.js';
import { hash, verify } from 'argon2';
import { usersRepo } from '../users/users.repository.js';
import { sessionsRepo } from './sessions.repository.js';
import { ConflictError, UnauthorizedError } from '../../shared/errors/http-error.js';
import { fakeVerify } from '../../utils/fake-verify.js';

export const authService = {
    async register(input: RegisterBody) {
        const passwordHash = await hash(input.password);
        try {
            const user = await usersRepo.create({ email: input.email, passwordHash, name: input.name ?? null });
            if (!user) throw new Error('Неудалось создать пользователя');
            const token = await sessionsRepo.create(user.id);
            return { user, token };
        } catch (e: any) {
            if ((e.cause ?? e).code === '23505') throw new ConflictError('Email уже занят');
            throw e;
        }
    },
    async login(input: LoginBody) {
        const row = await usersRepo.findByEmail(input.email);
        const ok = row ? await verify(row.passwordHash, input.password) : await fakeVerify();
        if (!row || !ok) throw new UnauthorizedError('Неверный email или пароль');
        const token = await sessionsRepo.create(row.id);
        const { passwordHash, ...user } = row;
        return { user, token };
    },
};