import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { db } from '../../db.js';

const publicCols = { id: users.id, email: users.email, name: users.name, createdAt: users.createdAt };

export const usersRepo = {
    findByEmail: (email: string) =>
        db.select().from(users).where(eq(sql`lower(${users.email})`, email)).then(r => r[0]),
    findById: (id: string) =>
        db.select(publicCols).from(users).where(eq(users.id, id)).then(r => r[0]),
    create: (data: { email: string; passwordHash: string; name?: string | null }) =>
        db.insert(users).values(data).returning(publicCols).then(r => r[0]),
};