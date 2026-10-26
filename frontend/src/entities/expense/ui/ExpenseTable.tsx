import { ExpenseRow } from './ExpenseRow';
import { Button } from '@/shared/ui/Button';
import styles from './ExpenseTable.module.scss';
import SegmentControl from '@/shared/ui/SegmentControl';
import { useState } from 'react';
import type { ActivityId } from '@/shared/types';
import type { Expense } from '../model';

const options = [
    { value: 'date', label: 'По дате' },
    { value: 'amount', label: 'По сумме' },
];

interface ExpenseTableProps {
    expenses: Expense[];
    activityTitles: Record<ActivityId, string>;
}

export function ExpenseTable({ expenses, activityTitles }: ExpenseTableProps) {
    const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
    const sorted = [...expenses].sort((a, b) =>
        sortBy === 'date'
            ? b.date.localeCompare(a.date) || a.id.localeCompare(b.id)
            : b.amountMinor - a.amountMinor || a.id.localeCompare(b.id),
    );

    return (
        <div className={styles.expenseContainer}>
            <div className={styles.expenseHeader}>
                <h3 className={styles.expenseHeaderTitle}>
                    Расходы • {expenses.length}
                </h3>
                <div className={styles.expenseHeaderRight}>
                    <div className={styles.expenseHeaderFilter}>
                        <SegmentControl
                            options={options}
                            value={sortBy}
                            onChange={(value) =>
                                setSortBy(value as 'date' | 'amount')
                            }
                        />
                    </div>
                    <Button onClick={() => {}} type="button" variant="primary">
                        + Pасход
                    </Button>
                </div>
            </div>
            <table className={styles.expenseTable}>
                <tbody>
                    {sorted.map((expense) => (
                        <ExpenseRow
                            key={expense.id}
                            expense={expense}
                            activityTitle={
                                expense.linkedActivityId
                                    ? activityTitles[expense.linkedActivityId]
                                    : undefined
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
