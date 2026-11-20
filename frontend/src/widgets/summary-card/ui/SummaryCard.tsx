import styles from './SummaryCard.module.scss';

export function SummaryCard({
    activitiesCount,
    daysCount,
    waitingBookingCount,
    plannedAmount
}: {
    activitiesCount: number,
    daysCount: number,
    waitingBookingCount: number,
    plannedAmount: string
}) {
    return (
        <div className={styles.summaryCard}>
            <h3>Сводка</h3>
            <div>Дней <div className={styles.summaryCardValue}>{daysCount}</div></div>
            <div>Активностей <div className={styles.summaryCardValue}>{activitiesCount}</div></div>
            <div>Ждут брони <div className={styles.summaryCardValue}>{waitingBookingCount}</div></div>
            <div>Забронировано <div className={styles.summaryCardValue}>{plannedAmount}</div></div>
        </div>
    );
}