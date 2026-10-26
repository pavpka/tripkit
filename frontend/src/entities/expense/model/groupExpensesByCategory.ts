import type { Expense, ExpenseCategory } from './types';

export interface ExpenseCategoryTotal {
    amount: number;
    percentage: number;
}

export type ExpensesByCategory = Record<ExpenseCategory, ExpenseCategoryTotal>;

export const groupExpensesByCategory = (
    expenses: Expense[],
): ExpensesByCategory => {
    const amounts = {} as Record<ExpenseCategory, number>;
    let total = 0;

    for (const { category, amountMinor } of expenses) {
        amounts[category] = (amounts[category] ?? 0) + amountMinor;
        total += amountMinor;
    }

    return Object.fromEntries(
        Object.entries(amounts).map(([category, amount]) => [
            category,
            { amount, percentage: total > 0 ? (amount / total) * 100 : 0 },
        ]),
    ) as ExpensesByCategory;
};
