import styles from './CategoryFilter.module.scss';
import { StackedBar } from '@/shared/ui/StackedBar';
import { getExpenseMeta } from '../model';

interface CategoryFilterProps {
    expensesByCategory: Record<
        string,
        { amount: number; percentage: number; color: string }
    >;
}

export function CategoryFilter({ expensesByCategory }: CategoryFilterProps) {
    return (
        <div className={styles.categoryFilter}>
            <div>По категориям</div>
            <StackedBar expensesByCategory={expensesByCategory} />
            <table>
                <tbody>
                    {Object.entries(expensesByCategory).map(
                        ([category, { amount, percentage }]) => {
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
                                    <td>{meta.label}</td>
                                    <td>{percentage.toFixed(0)}%</td>
                                    <td>{amount}</td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
}
