import type { Expense, ExpenseCategory } from './types';
import type { CurrencyCode } from '@/shared/types';

export interface ExpenseCategoryTotal {
    amount: number;
    percentage: number;
    currency: CurrencyCode;
}

export type ExpensesByCategory = Record<ExpenseCategory, ExpenseCategoryTotal>;

export const groupExpensesByCategory = (
    expenses: Expense[],
    currency: CurrencyCode,
): ExpensesByCategory => {
    const amounts = {} as Record<ExpenseCategory, number>;
    let total = 0;

    for (const { category, amount } of expenses) {
        amounts[category] = (amounts[category] ?? 0) + amount;
        total += amount;
    }

    return Object.fromEntries(
        Object.entries(amounts).map(([category, amount]) => [
            category,
            { amount, percentage: total > 0 ? (amount / total) * 100 : 0, currency },
        ]),
    ) as ExpensesByCategory;
};
