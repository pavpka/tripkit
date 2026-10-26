import styles from './BudgetCard.module.scss';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { BUDGET_STATUS_COLORS, type BudgetStatus } from '@/entities/trip';

export default function BudgetCard({
    status,
    percent,
    remaining,
    spent,
    total,
    currency,
}: {
    status: BudgetStatus;
    percent: number;
    remaining: number;
    spent: number;
    total: number | null;
    currency: string;
}) {
    const isUnset = status === 'unset';
    return (
        <div className={styles.budgetCard}>
            <div className={styles.budgetCardTitle}>
                <div className={styles.budgetCardTitleText}>Бюджет</div>
                <div
                    className={styles.budgetCardPercent}
                    style={{ color: BUDGET_STATUS_COLORS[status] }}
                >
                    {isUnset ? '—' : `${percent}%`}
                </div>
            </div>
            <div style={{ height: '10px' }}>
                <ProgressBar progress={percent} tone={status} />
            </div>
            <div className={styles.budgetCardValue}>
                {isUnset
                    ? `${spent} ${currency}`
                    : `${spent} из ${total} ${currency}`}
            </div>
            <div className={styles.budgetCardRemaining}>
                {isUnset
                    ? 'Бюджет не задан'
                    : remaining >= 0
                      ? `осталось ${remaining} ${currency}`
                      : `перерасход на ${Math.abs(remaining)} ${currency}`}
            </div>
        </div>
    );
}
