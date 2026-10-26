import styles from './NeedToBookCard.module.scss';
import type { Activity } from '@/entities/activity';

export default function NeedToBookCard({
    notBooked,
}: {
    notBooked: Activity[];
}) {
    return (
        <div className={styles.needToBookCard}>
            <div className={styles.needToBookCardTitle}>
                Нужно забронировать
            </div>
            {notBooked.map((activity) => (
                <div className={styles.needToBookCardItem} key={activity.id}>
                    <div className={styles.needToBookCardItemTitle}>
                        {activity.title} - {activity.costEstimate ?? '—'}
                    </div>
                </div>
            ))}
        </div>
    );
}
