import type { CreateExpenseDto, UpdateExpenseDto } from "./expenses.types.js";
import type { Expense } from "./expenses.types.js";
import { db, type DbExecutor } from "../../db.js";
import { expenses } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

export interface ExpensesRepository {
    getAll(tripId: string): Promise<Expense[]>;
    getAllByActivityId(activityId: string): Promise<Expense[]>;
    create(expense: CreateExpenseDto): Promise<Expense>;
    delete(id: string, tripId: string): Promise<void>;
    update(id: string, tripId: string, expense: UpdateExpenseDto): Promise<void>;
}

export class PostgresExpensesRepository implements ExpensesRepository {
    async getAll(tripId: string): Promise<Expense[]> {
        return db.select().from(expenses).where(eq(expenses.tripId, tripId));
    }
    async getAllByActivityId(activityId: string): Promise<Expense[]> {
        return db.select().from(expenses).where(eq(expenses.activityId, activityId));
    }
    async create(expense: CreateExpenseDto): Promise<Expense> {
        const [newExpense] = await db.insert(expenses).values(expense).returning();
        if (!newExpense) {
            throw new Error('Failed to create expense');
        }
        return newExpense;
    }
    async delete(id: string, tripId: string): Promise<void> {
        await db.delete(expenses).where(and(eq(expenses.id, id), eq(expenses.tripId, tripId)));
    }
    async update(id: string, tripId: string, expense: UpdateExpenseDto): Promise<void> {
        await db.update(expenses).set(expense).where(and(eq(expenses.id, id), eq(expenses.tripId, tripId)));
    }
}