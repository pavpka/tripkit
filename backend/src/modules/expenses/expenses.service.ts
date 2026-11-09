import type { ExpensesRepository } from "./expenses.repository.js";
import type { CreateExpenseDto, Expense, UpdateExpenseDto } from "./expenses.types.js";

export class ExpensesService {
    constructor(private readonly repo: ExpensesRepository) { }

    async getAll(tripId: string): Promise<Expense[]> {
        return this.repo.getAll(tripId);
    }
    async getAllByActivityId(activityId: string): Promise<Expense[]> {
        return this.repo.getAllByActivityId(activityId);
    }
    async create(expense: CreateExpenseDto): Promise<Expense> {
        return this.repo.create(expense);
    }
    async delete(id: string, tripId: string): Promise<void> {
        return this.repo.delete(id, tripId);
    }
    async update(id: string, tripId: string, expense: UpdateExpenseDto): Promise<void> {
        return this.repo.update(id, tripId, expense);
    }
}