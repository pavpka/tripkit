import { randomBytes, createHash } from 'node:crypto';
import { and, eq, gt, lt, ne } from 'drizzle-orm';
import { db } from '../../db.js';
import { sessions } from '../../db/schema.js';
import { users } from '../../db/schema.js';

const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const hashToken = (t: string) => createHash('sha256').update(t).digest('hex');

export const sessionsRepo = {
    async create(userId: string) {
        const token = randomBytes(32).toString('base64url'); 
        await db.insert(sessions).values({
            id: hashToken(token),
            userId,
            expiresAt: new Date(Date.now() + TTL_MS),
        });
        return token;
    },

    async findValid(token: string) {
        const [row] = await db
            .select({
                sessionId: sessions.id, expiresAt: sessions.expiresAt,
                id: users.id, email: users.email, name: users.name
            })
            .from(sessions)
            .innerJoin(users, eq(users.id, sessions.userId))
            .where(and(eq(sessions.id, hashToken(token)), gt(sessions.expiresAt, new Date())))
            .limit(1);
        return row;
    },

    extend: (sessionId: string) =>
        db.update(sessions).set({ expiresAt: new Date(Date.now() + TTL_MS) })
            .where(eq(sessions.id, sessionId)),

    deleteByToken: (token: string) =>
        db.delete(sessions).where(eq(sessions.id, hashToken(token))),

    deleteAllForUser: (userId: string, exceptSessionId?: string) =>
        db.delete(sessions).where(exceptSessionId
            ? and(eq(sessions.userId, userId), ne(sessions.id, exceptSessionId))
            : eq(sessions.userId, userId)),

    deleteExpired: () => db.delete(sessions).where(lt(sessions.expiresAt, new Date())),
};