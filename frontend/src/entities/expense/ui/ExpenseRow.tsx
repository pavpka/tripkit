import { getExpenseMeta, type Expense } from '../model';
import styles from './ExpenseRow.module.scss';

export function ExpenseRow({
    expense,
    activityTitle,
}: {
    expense: Expense;
    activityTitle?: string;
}) {
    const date = new Date(expense.date)
        .toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
        .replace('.', '');
    const meta = getExpenseMeta(expense.category);
    return (
        <tr className={styles.expenseRow}>
            <td className={styles.expenseRowDate}>{date}</td>
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
                    {expense.title}
                    <div>{activityTitle ?? meta.label}</div>
                </div>
            </td>

            <td className={styles.expenseRowAmount}>
                {expense.amountMinor} {expense.currency}
            </td>
            <td className={styles.expenseRowMore}>
                <div className={styles.expenseRowMoreIcon}>
                    <img src="/icons/shared/more.svg" alt="more" />
                </div>
            </td>
        </tr>
    );
}
