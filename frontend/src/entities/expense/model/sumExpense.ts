import type { Expense } from './types';

export const sumExpense = (expenses: Expense[]): number => {
    return expenses.reduce((acc, expense) => acc + expense.amountMinor, 0);
};
