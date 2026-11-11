import { getExpenseMeta, type Expense } from '../model';
import styles from './ExpenseRow.module.scss';
import { Button } from '@/shared/ui/Button';
import { formatDayDate } from '@/shared/lib/dates/dates';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { getCurrencySymbol } from '@/shared/lib/money';

function rowText(expense: Expense, activityTitle?: string): { title: string, desc: ReactNode } {
    const category = getExpenseMeta(expense.category).label;
    if (expense.description) {
        return { title: expense.description, desc: activityTitle ? (<Link to={`/trips/${expense.tripId}/itinerary`}>{activityTitle}</Link>) : (category) };
    }
    if (activityTitle) {
        return { title: activityTitle, desc: category };
    }
    return { title: category, desc: null };
}

export function ExpenseRow({
    expense,
    activityTitle,
}: {
    expense: Expense;
    activityTitle?: string;
}) {
    const meta = getExpenseMeta(expense.category);

    const { title, desc } = rowText(expense, activityTitle);

    return (
        <tr className={styles.expenseRow}>
            <td className={styles.expenseRowDate}>{formatDayDate(expense.date, false)}</td>
            <td className={styles.expenseRowIcon}>
                <div className={styles.expenseRowIconImage}>
                    <img
                        src={`/icons/expenses/${meta.icon}`}
                        alt={meta.label}
                    />
                </div>
            </td>
            <td className={styles.expenseRowTitle}>
                <div className={styles.expenseRowTitleText}>
                    {title}
                    <div className={styles.expenseRowTitleDesc}>{desc}</div>
                </div>
            </td>

            <td className={styles.expenseRowAmount}>
                {expense.amount} {getCurrencySymbol(expense.currency)}
            </td>
            <td className={styles.expenseRowMore}>
                <div className={styles.expenseRowMoreIcon}>
                    <Button variant="secondary" onClick={() => { }} type="button">
                        <img src="/icons/shared/more.svg" alt="more" />
                    </Button>
                </div>
            </td>
        </tr>
    );
}
