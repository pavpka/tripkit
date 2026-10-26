import type { Activity } from '@/entities/activity';
import type { Expense, ExpensesByCategory } from '@/entities/expense';
import type { BudgetStatus, Trip } from '@/entities/trip';

export type TripDetailsContext = {
    trip: Trip;
    percent: number;
    remaining: number;
    status: BudgetStatus;
    packedItems: number;
    totalItems: number;
    spent: number;
    places: Activity[];
    expensesByCategory: ExpensesByCategory;
    tripExpenses: Expense[];
};
