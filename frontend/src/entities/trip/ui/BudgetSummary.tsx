import { ProgressBar } from '@/shared/ui/ProgressBar';
import styles from './BudgetSummary.module.scss';
import { BUDGET_STATUS_COLORS, type BudgetStatus } from '../model';

interface BudgetSummaryProps {
    spent: number;
    budgetTotal: number;
    remaining: number;
    percent: number;
    status: BudgetStatus;
    currency: string;
}

const STATUS_LABELS: Record<BudgetStatus, string> = {
    unset: 'не задан',
    ok: 'в пределах',
    warning: 'превышение',
    over: 'перерасход',
};

export function BudgetSummary({
    spent,
    budgetTotal,
    remaining,
    percent,
    status,
    currency,
}: BudgetSummaryProps) {
    const isUnset = status === 'unset';
    return (
        <div className={styles.budgetSummary}>
            <div className={styles.budgetSummarySpent}>
                <div className={styles.budgetSummarySpentValue}>
                    <div>Потрачено</div>
                    <div>
                        <span className={styles.budgetSummarySpentValueAmount}>
                            {spent} {currency}
                        </span>
                        <span>
                            {isUnset
                                ? ' — бюджет не задан'
                                : ` из ${budgetTotal} ${currency}`}
                        </span>
                    </div>
                </div>
                <div className={styles.budgetSummarySpentPercent}>
                    <div
                        className={styles.budgetSummarySpentPercentValue}
                        style={{ color: BUDGET_STATUS_COLORS[status] }}
                    >
                        {isUnset ? '—' : `${percent}%`}
                    </div>
                    <div>{STATUS_LABELS[status]}</div>
                </div>
            </div>

            <div className={styles.budgetSummaryProgressBar}>
                <ProgressBar progress={percent} tone={status} />
            </div>

            <div className={styles.budgetSummaryDetails}>
                <div>
                    {status === 'over' ? 'Перерасход' : 'Остаток'}
                    <div
                        className={styles.budgetSummaryDetailsValue}
                        style={{
                            color:
                                status === 'over'
                                    ? BUDGET_STATUS_COLORS.over
                                    : '#2b2622',
                        }}
                    >
                        {isUnset
                            ? '—'
                            : `${status === 'over' ? -remaining : remaining} ${currency}`}
                    </div>
                </div>
                <div>
                    На человека
                    <div className={styles.budgetSummaryDetailsValue}>
                        {isUnset ? '—' : `${remaining}/2 ${currency}`}
                    </div>
                </div>
                <div>
                    Еще не оплачено по броням
                    <div className={styles.budgetSummaryDetailsValue}>
                        X {currency}
                    </div>
                </div>
            </div>
        </div>
    );
}
