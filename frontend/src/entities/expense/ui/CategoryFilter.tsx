import styles from './CategoryFilter.module.scss';
import { StackedBar } from '@/shared/ui/StackedBar';
import { getExpenseMeta } from '../model';
import type { CurrencyCode } from '@/shared/types';
import { getCurrencySymbol } from '@/shared/lib/money';

interface CategoryFilterProps {
    expensesByCategory: Record<
        string,
        { amount: number; percentage: number; color: string; currency: CurrencyCode }
    >;
}

export function CategoryFilter({ expensesByCategory }: CategoryFilterProps) {
    return (
        <div className={styles.categoryFilter}>
            <div className={styles.categoryFilterTitle}>По категориям</div>
            <StackedBar expensesByCategory={expensesByCategory} />
            <table className={styles.categoryFilterTable}>
                <tbody>
                    {Object.entries(expensesByCategory).map(
                        ([category, { amount, percentage, currency }]) => {
                            const meta = getExpenseMeta(category);
                            return (
                                <tr key={category}>
                                    <td>
                                        <div
                                            className={styles.categoryIcon}
                                            style={{
                                                backgroundColor: meta.soft,
                                            }}
                                        >
                                            <img
                                                className={
                                                    styles.categoryIconImage
                                                }
                                                src={`/icons/expenses/${meta.icon}`}
                                                alt={category}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.categoryLabel}>{meta.label}</div>
                                    </td>
                                    <td>
                                        <div className={styles.categoryPercentage}>{percentage.toFixed(0)}%</div>
                                    </td>
                                    <td>
                                        <div className={styles.categoryAmount}>{amount} {getCurrencySymbol(currency)}</div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
}
