import styles from './NeedToBookCard.module.scss';
import type { Activity } from '@/entities/activity';
import { getActivityBgColor, getActivityIcon } from '@/entities/activity/model/constants';
import { Button } from '@/shared/ui/Button';

export default function NeedToBookCard({
    notBooked,
    currency,
}: {
    notBooked: Activity[];
    currency: string;
}) {
    return (
        <div className={styles.needToBookCard}>
            <div className={styles.needToBookCardTitle}>
                📝 Нужно забронировать
            </div>
            {notBooked.map((activity) => (
                <div className={styles.needToBookCardItem} key={activity.id}>
                    <div className={styles.needToBookCardItemIcon} style={{ backgroundColor: getActivityBgColor(activity.type) }}>
                        <img src={`/icons/activities/${getActivityIcon(activity.type)}`} alt={activity.title} />
                    </div>
                    <div className={styles.needToBookCardItemTitle}>
                        {activity.title}
                        <div className={styles.needToBookCardItemCost}>{activity.costEstimate ?? '—'} {currency}</div>
                    </div>
                    <div className={styles.needToBookCardItemButton}>
                        <Button variant="secondary" onClick={() => { }} type="button">Забронировать</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
