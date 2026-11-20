import type { Request, Response, NextFunction } from 'express';
import { sessionsRepo } from './sessions.repository.js';
import { UnauthorizedError } from '../../shared/errors/http-error.js';
import { cookieOpts } from './auth.cookie.js';

const HALF_TTL_MS = 15 * 24 * 60 * 60 * 1000;

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.sid;
        if (!token) return next(new UnauthorizedError('Требуется вход'));

        const s = await sessionsRepo.findValid(token);
        if (!s) {
            res.clearCookie('sid', {...cookieOpts, maxAge: undefined});
            return next(new UnauthorizedError('Сессия истекла'));
        }

        if (s.expiresAt.getTime() - Date.now() < HALF_TTL_MS) {
            await sessionsRepo.extend(s.sessionId);
            res.cookie('sid', token, cookieOpts);
        }

        req.user = { id: s.id, email: s.email, name: s.name };
        req.sessionId = s.sessionId;
        next();
    } catch (e) {
        next(e);
    }
}