import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { registerBody } from './auth.schema.js';
import { loginBody } from './auth.schema.js';
import { cookieOpts } from './auth.cookie.js';
import { sessionsRepo } from './sessions.repository.js';

export const authController = {
    async register(req: Request, res: Response) {
        const { user, token } = await authService.register(registerBody.parse(req.body));
        res.cookie('sid', token, cookieOpts).status(201).json(user);
    },
    async login(req: Request, res: Response) {
        const { user, token } = await authService.login(loginBody.parse(req.body));
        res.cookie('sid', token, cookieOpts).json(user);
    },
    async logout(req: Request, res: Response) {
        const token = req.cookies?.sid;
        if (token) await sessionsRepo.deleteByToken(token);
        res.clearCookie('sid', { ...cookieOpts, maxAge: undefined }).status(204).end();
    },
    async me(req: Request, res: Response) {
        res.json(req.user);
    },
};