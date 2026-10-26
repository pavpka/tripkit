import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema.js';
/*

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tripkit-db',
    password: 'admin',
    port: 5432,
    connectionTimeoutMillis: 5000,
    query_timeout: 10000
});

export const db = {
    query: (text: string, params: unknown[]) => pool.query(text, params),
    pool
};


export async function checkDbConnection(): Promise<void> {
    const res = await pool.query('SELECT NOW()');
    console.log('Postgres подключен! Время сервера:', res.rows[0].now);
}
*/

export const db = drizzle(process.env.DATABASE_URL!);

export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DbExecutor = typeof db | DbTransaction;